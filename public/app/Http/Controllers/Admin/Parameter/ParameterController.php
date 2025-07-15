<?php

namespace App\Http\Controllers\Admin\Parameter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Parameter\ParameterRequest;
use App\Http\Requests\Admin\Setting\SettingRequest; // Используем общий реквест для настроек
// Реквесты для простых действий
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Requests\Admin\UpdateSortRequest; // Если параметры нужно сортировать
use App\Http\Resources\Admin\Setting\SettingResource; // Используем общий ресурс
use App\Models\Admin\Setting\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request; // Для bulkDestroy
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;
use Illuminate\Database\Eloquent\Builder; // Для типизации $query

/**
 * Контроллер для управления Параметрами системы в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Setting\Setting Модель Статьи
 * @see \App\Http\Requests\Admin\Setting\SettingRequest Запрос для создания/обновления
 */
class ParameterController extends Controller
{

    /**
     * Отображение списка всех Параметров.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-parameters');

        // Используем тот же конфиг, что и для Settings? Или нужен отдельный?
        $adminCountSettings = config('site_settings.AdminCountSettings', 15); // Используем свой ключ или общий
        $adminSortSettings  = config('site_settings.AdminSortSettings', 'idDesc'); // Используем свой ключ или общий

        try {
            $settings = Setting::all();
            $settingsCount = Setting::count();
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки параметров для Index: " . $e->getMessage());
            $settings = collect(); // Пустая коллекция в случае ошибки
            $settingsCount = 0;
            session()->flash('error', __('admin/controllers/parameters.index_error'));
        }

        return Inertia::render('Admin/Parameters/Index', [
            // Используем SettingResource, но передаем как 'parameters'
            'settings' => SettingResource::collection($settings),
            'settingsCount' => $settingsCount,
            'adminCountSettings' => (int)$adminCountSettings,
            'adminSortSettings' => $adminSortSettings,
        ]);
    }

    /**
     * Отображение формы создания нового параметра.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-setting', Setting::class); // Или кастомное право
        return Inertia::render('Admin/Parameters/Create', [
            // Передаем дефолтное значение категории, если нужно
            // 'defaultCategory' => self::PARAMETER_CATEGORY,
        ]);
    }

    /**
     * Сохранение нового параметра в базе данных.
     * Использует SectionRequest для валидации и авторизации.
     *
     * @param ParameterRequest $request
     * @return RedirectResponse Редирект на список статей с сообщением.
     */
    public function store(ParameterRequest $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('create-setting', Setting::class);
        $data = $request->validated();

        // Принудительно устанавливаем категорию (или тип), если она не передается из формы
        // TODO: Адаптировать под ваш способ идентификации
        // $data['category'] = self::PARAMETER_CATEGORY;
        $data['type'] = 'parameter'; // Пример

        try {
            Setting::create($data);
            Log::info('Параметр системы успешно создан: ', ['option' => $data['option']]);
            // Редирект на индекс параметров
            return redirect()->route('admin.parameters.index')
                ->with('success', __('admin/controllers/parameters.created'));
        } catch (Throwable $e) {
            Log::error("Ошибка при создании параметра: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/parameters.create_error')]);
        }
    }

    /**
     * Отображение формы редактирования существующего параметра.
     * Использует Route Model Binding для получения модели.
     *
     * @param string $id
     * @return Response
     */
    public function edit(string $id): Response
    {
        $setting = Setting::findOrFail($id);

        return Inertia::render('Admin/Parameters/Edit', [
            'setting' => new SettingResource($setting),
        ]);
    }

    /**
     * Обновление существующего параметра в базе данных.
     * Использует SettingRequest и Route Model Binding.
     *
     * @param ParameterRequest $request Валидированный запрос.
     * @param string $id
     * @return RedirectResponse Редирект на список параметров с сообщением.
     */
    public function update(ParameterRequest $request, string $id): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update', $setting);

        $setting = Setting::findOrFail($id);
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $setting->update($data);
            DB::commit();

            Log::info('Параметр системы обновлен: ', ['id' => $setting->id, 'option' => $setting->option]);
            return redirect()->route('admin.parameters.index')
                ->with('success', __('admin/controllers/parameters.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении параметра ID {$setting->id}: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/parameters.update_error')]);
        }
    }

    /**
     * Удаление указанного параметра.
     * Использует Route Model Binding.
     *
     * @param Setting $setting Модель настроек для удаления.
     * @return RedirectResponse Редирект на список параметров с сообщением.
     */
    public function destroy(Setting $setting): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-setting', $setting);

        try {
            DB::beginTransaction();
            $setting->delete();
            DB::commit();

            Log::info('Параметр системы удален: ID ' . $setting->id);
            return redirect()->route('admin.parameters.index')
                ->with('success', __('admin/controllers/parameters.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении параметра ID {$setting->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/parameters.delete_error')]);
        }
    }

    /**
     * Обновление статуса активности параметра.
     *
     * @param UpdateActivityRequest $request
     * @param Setting $setting
     * @return RedirectResponse
     */
    public function updateActivity(UpdateActivityRequest $request, Setting $setting): RedirectResponse
    {
        $validated = $request->validated();

        if (in_array($setting->category, ['system', 'admin', 'public'], true)) {
            Log::info("Попытка изменения активности параметра ID {$setting->id} с категорией '{$setting->category}'.");

            return back()->with('warning', __('admin/controllers/parameters.activity_update_forbidden', [
                'category' => $setting->category,
            ]));
        }

        try {
            $setting->activity = $validated['activity'];
            $setting->save();

            $actionText = $setting->activity ? 'активирован' : 'деактивирован';
            Log::info("Параметр ID {$setting->id} успешно {$actionText}");

            return back()->with('success', __('admin/controllers/parameters.update_activity_success', [
                'option' => $setting->option,
                'action' => $actionText,
            ]));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности параметра ID {$setting->id}: " . $e->getMessage());

            return back()->withErrors([
                'general' => __('admin/controllers/parameters.update_activity_error'),
            ]);
        }
    }

    /**
     * Обновление статуса активности массово
     *
     * @param Request $request
     * @return JsonResponse Json ответ
     */
    public function bulkUpdateActivity(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:settings,id',
            'activity' => 'required|boolean',
        ]);

        Setting::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);

        return response()->json(['success' => true]);
    }

    /**
     * Обновление значения сортировки для одного параметра.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Setting $setting Модель параметра для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Setting $setting): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();
        try {
            $setting->sort = $validated['sort'];
            $setting->save();
            Log::info("Обновлено sort параметра ID {$setting->id} на {$setting->sort}");
            return back();

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки параметра ID {$setting->id}: " . $e->getMessage());
            return back()->withErrors(['sort' => __('admin/controllers/parameters.update_sort_error')]);
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'settings'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-settings');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => ['required', 'integer', 'exists:settings,id'],
            'settings.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['settings'] as $settingData) {
                // Используем update для массового обновления, если возможно, или where/update
                Setting::where('id', $settingData['id'])->update(['sort' => $settingData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка параметров', ['count' => count($validated['settings'])]);
            return back();

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки параметров: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/parameters.bulk_update_sort_error')]);
        }
    }

}
