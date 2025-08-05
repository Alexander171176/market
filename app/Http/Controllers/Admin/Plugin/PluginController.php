<?php

namespace App\Http\Controllers\Admin\Plugin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Plugin\PluginRequest; // Используем
// Реквесты для простых действий
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Requests\Admin\UpdateSortRequest;
use App\Http\Resources\Admin\Plugin\PluginResource;
use App\Models\Admin\Plugin\Plugin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request; // Для bulkDestroy
use Illuminate\Support\Facades\DB; // Для транзакций (опционально)
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable; // Для try/catch

/**
 * Контроллер для управления Модулями в административной панели.
 *
 * Предоставляет CRUD операции.
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Plugin\Plugin Модель Модуля
 * @see \App\Http\Requests\Admin\Plugin\PluginRequest Запрос для создания/обновления
 */
class PluginController extends Controller
{
    /**
     * Отображение списка всех Модулей.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-plugins', Plugin::class);
        $adminCountPlugins = config('site_settings.AdminCountPlugins', 15);
        $adminSortPlugins  = config('site_settings.AdminSortPlugins', 'idDesc');

        try {
            $plugins = Plugin::all();
            $pluginsCount = Plugin::count();
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки модулей для Index: " . $e->getMessage());
            $plugins = collect(); // Пустая коллекция в случае ошибки
            $pluginsCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Plugins/Index', [
            'plugins' => PluginResource::collection($plugins),
            'pluginsCount' => $pluginsCount,
            'adminCountPlugins' => (int)$adminCountPlugins,
            'adminSortPlugins' => $adminSortPlugins,
        ]);
    }

    /**
     * Отображение формы создания нового модуля.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-plugin', Plugin::class);
        return Inertia::render('Admin/Plugins/Create');
    }

    /**
     * Сохранение нового модуля в базе данных.
     * Использует PluginRequest для валидации и авторизации.
     *
     * @param PluginRequest $request
     * @return RedirectResponse Редирект на список модулей с сообщением.
     */
    public function store(PluginRequest $request): RedirectResponse
    {
        // authorize() в PluginRequest
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $plugin = Plugin::create($data);
            DB::commit();

            Log::info('Плагин успешно создан: ', ['id' => $plugin->id, 'name' => $plugin->name]);
            return redirect()->route('admin.plugins.index')
                ->with('success', __('admin/controllers.created_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании плагина: " . $e->getMessage());
            return back()->withInput()
                ->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение существующего модуля по id.
     * Использует Route Model Binding для получения модели.
     *
     * @param string $id
     * @return Response
     */
    public function show(string $id): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('show-plugin', $plugin);
        $plugin = Plugin::findOrFail($id);
        $pluginName = ucfirst($plugin->name);

        return Inertia::render("Plugins/{$pluginName}/Index", [
            'plugin' => new PluginResource($plugin),
            'pluginName' => $pluginName,
        ]);
    }

    /**
     * Отображение формы редактирования существующего модуля.
     * Использует Route Model Binding для получения модели.
     *
     * @param Plugin $plugin Модель модуля, найденный по ID из маршрута.
     * @return Response
     */
    public function edit(Plugin $plugin): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('update', $plugin);
        return Inertia::render('Admin/Plugins/Edit', [
            'plugin' => new PluginResource($plugin),
        ]);
    }

    /**
     * Обновление существующего модуля в базе данных.
     * Использует PluginRequest и Route Model Binding.
     *
     * @param PluginRequest $request Валидированный запрос.
     * @param Plugin $plugin Модель модуля для обновления.
     * @return RedirectResponse Редирект на список модулей с сообщением.
     */
    public function update(PluginRequest $request, Plugin $plugin): RedirectResponse // Используем RMB
    {
        // authorize() в PluginRequest
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $plugin->update($data);
            DB::commit();

            Log::info('Плагин обновлен: ', ['id' => $plugin->id, 'name' => $plugin->name]);
            return redirect()->route('admin.plugins.index')
                ->with('success', __('admin/controllers.updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении плагина ID {$plugin->id}: " . $e->getMessage());
            return back()->withInput()
                ->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанного модуля.
     * Использует Route Model Binding.
     *
     * @param Plugin $plugin Модель модуля для удаления.
     * @return RedirectResponse Редирект на список модулей с сообщением.
     */
    public function destroy(Plugin $plugin): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('delete-plugin', $plugin);
        try {
            DB::beginTransaction();
            $plugin->delete();
            DB::commit();

            Log::info('Плагин удален: ID ' . $plugin->id);
            return redirect()->route('admin.plugins.index')
                ->with('success', __('admin/controllers.deleted_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении плагина ID {$plugin->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Обновление статуса активности модуля.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Plugin $plugin Модель модуля для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Plugin $plugin): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $plugin->activity = $validated['activity'];
            $plugin->save();
            DB::commit();

            Log::info("Обновлено activity модуля ID {$plugin->id} на {$plugin->activity}");

            return back()
                ->with('success', __('admin/controllers.activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности модуля ID {$plugin->id}: "
                . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.activity_updated_error'));
        }
    }

    /**
     * Обновление статуса активности массово
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkUpdateActivity(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:plugins,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();

            // Исправление: используем один запрос whereIn и правильный ключ 'ids'
            Plugin::whereIn('id', $validated['ids'])
                ->update(['activity' => $validated['activity']]);

            DB::commit();

            Log::info('Массово обновлена активность плагинов', [
                'count' => count($validated['ids']),
                'activity' => $validated['activity'],
            ]);

            return back()->with('success', __('admin/controllers.bulk_activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности плагинов: " . $e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одного тега.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Plugin $plugin Модель тега для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Plugin $plugin): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $plugin->sort = $validated['sort'];
            $plugin->save();
            DB::commit();

            Log::info("Обновлено sort модуля ID {$plugin->id} на {$plugin->sort}");
            return back()
                ->with('success', __('admin/controllers.sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления сортировки модуля ID {$plugin->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'plugins'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-plugins');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'plugins' => 'required|array',
            'plugins.*.id' => ['required', 'integer', 'exists:plugins,id'],
            'plugins.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['plugins'] as $pluginData) {
                // Используем update для массового обновления, если возможно, или where/update
                Plugin::where('id', $pluginData['id'])->update(['sort' => $pluginData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка модулей',
                ['count' => count($validated['plugins'])]);
            return back()
                ->with('success', __('admin/controllers.bulk_sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки модулей: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

    /**
     * Вспомогательная функция для генерации имени компонента (пример)
     * Нужна, если вы используете динамический рендеринг в методе show()
     */
    /*
    private function generatePluginViewName(string $pluginName): string
    {
        // Преобразует 'my_plugin' или 'my-plugin' в 'MyPlugin'
        return str_replace(['_', '-'], '', ucwords($pluginName, '_-'));
    }
    */

    // Методы clone для плагинов обычно не нужны.
    // Методы getPluginData, getPluginSettings, updatePluginSettings вынесены в трейты или ApiPluginController? Оставляем их там.
}
