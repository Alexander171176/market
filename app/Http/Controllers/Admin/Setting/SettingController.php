<?php

namespace App\Http\Controllers\Admin\Setting;

use App\Http\Controllers\Controller;
// Реквесты
use App\Http\Requests\Admin\Setting\SettingRequest;
use App\Http\Requests\Admin\Setting\UpdateLocaleRequest;
use App\Http\Requests\Admin\Setting\UpdateSettingValueRequest;
use App\Http\Requests\Admin\Setting\UpdateSortSettingRequest;
use App\Http\Requests\Admin\Setting\UpdateWidgetPanelRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateCountSettingRequest;
use App\Http\Requests\Admin\UpdateSortRequest;
// Ресурсы
use App\Http\Resources\Admin\Setting\SettingResource;
// Модели
use App\Models\Admin\Setting\Setting;
// Фасады и прочее
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Throwable;

class SettingController extends Controller
{
    // Время кэширования специфичных настроек
    private const SETTINGS_CACHE_TTL = 3600; // 1 час

    // --- Стандартные CRUD методы ---

    /**
     * Отображение списка всех настроек.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        // TODO: Проверка прав $this->authorize('view-settings', Setting::class);

        // Получаем настройки для фронтенда (дефолтные значения)
        $adminCountSettings = config('site_settings.AdminCountSettings', 15); // Для ItemsPerPageSelect
        $adminSortSettings  = config('site_settings.AdminSortSettings', 'idDesc'); // Для SortSelect

        try {
            // Загружаем ВСЕ рубрики с количеством секций (или без, если не нужно в таблице)
            $settings = Setting::all(); // Загружаем ВСЕ
            $settingsCount = $settings->count(); // Считаем из загруженной коллекции

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки рубрик для Index: " . $e->getMessage());
            $settings = collect();
            $settingsCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Settings/Index', [
            // Передаем ПОЛНУЮ коллекцию ресурсов
            'settings' => SettingResource::collection($settings),
            'settingsCount' => $settingsCount,
            // Передаем дефолтные/текущие настройки для инициализации фронтенда
            'adminCountSettings' => (int)$adminCountSettings,
            'adminSortSettings' => $adminSortSettings, // Это значение прочитает SortSelect при загрузке
        ]);
    }

    /**
     * Обновление значения конкретной настройки.
     *
     * @param UpdateSettingValueRequest $request
     * @param Setting $setting
     * @return RedirectResponse
     */
    public function updateValue(UpdateSettingValueRequest $request, Setting $setting): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $setting->update([
                'value' => $request->validated()['value'],
            ]);

            DB::commit();

            Log::info('Значение настройки обновлено', [
                'id' => $setting->id,
                'option' => $setting->option,
                'new_value' => $setting->value,
            ]);

            return back()
                ->with('success', __('admin/controllers.value_updated_success'));

        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error("Ошибка при обновлении значения настройки ID
            {$setting->id}: {$e->getMessage()}");

            return back()
                ->with('error', __('admin/controllers.value_updated_error'));
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

            return back()
                ->with('warning', __('admin/controllers.activity_update_forbidden_error', [
                'category' => $setting->category,
            ]));
        }

        try {
            $setting->activity = $validated['activity'];
            $setting->save();

            $actionText = $setting->activity ? 'активирован' : 'деактивирован';
            Log::info("Параметр ID {$setting->id} успешно {$actionText}");

            return back()
                ->with('success', __('admin/controllers.activity_updated_success', [
                'option' => $setting->option,
                'action' => $actionText,
            ]));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности параметра ID {$setting->id}: "
                . $e->getMessage());

            return back()->withErrors([
                'general' => __('admin/controllers.activity_updated_error'),
            ]);
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
            'ids.*'    => 'required|integer|exists:settings,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['settings'] as $settingData) {
                // Используем update для массового обновления, если возможно, или where/update
                Setting::where('id', $settingData['id'])->update(['activity' => $settingData['activity']]);
            }
            DB::commit();

            Log::info('Массово обновлена активность',
                ['count' => count($validated['settings'])]);
            return back()
                ->with('success', __('admin/controllers.bulk_activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновляет настройку и возвращает RedirectResponse.
     *
     * @param FormRequest $request Валидированный запрос (UpdateCountSettingRequest или UpdateSortSettingRequest)
     * @param string $optionKey Ключ опции в БД (напр., 'AdminCountRubrics')
     * @param string $configKey Ключ в runtime конфиге (напр., 'site_settings.AdminCountRubrics')
     * @param string $settingType Тип значения для поля 'type' в БД ('number' или 'string')
     * @param string $settingCategory Категория настройки в БД ('admin' или 'admin')
     * @param string $successMessage Сообщение для flash об успехе
     * @param string $errorMessage Сообщение для flash об ошибке
     * @return RedirectResponse
     */
    private function updateSettingAndRedirect(
        FormRequest $request, // Принимаем базовый FormRequest, т.к. конкретный уже отработал
        string $optionKey,
        string $configKey,
        string $settingType,
        string $settingCategory,
        string $successMessage,
        string $errorMessage
    ): RedirectResponse
    {
        // Данные уже валидированы специфичным реквестом (UpdateCount... или UpdateSort...)
        $validated = $request->validated();
        $newValue = $validated['value']; // Получаем валидированное значение

        try {
            // Транзакция для updateOrCreate не строго обязательна, но может быть для консистентности
            DB::beginTransaction();

            Setting::updateOrCreate(
                ['option' => $optionKey], // Условие поиска
                [                       // Данные для обновления/создания
                    'value' => (string)$newValue, // Сохраняем всегда как строку
                    'type' => $settingType,
                    'constant' => strtoupper($optionKey), // Генерируем константу
                    'category' => $settingCategory,
                    'activity' => true,
                ]
            );

            config([$configKey => $newValue]); // Обновляем runtime конфиг
            $this->clearSettingsCache('setting_' . $optionKey); // Очищаем кэш
            $this->clearSettingsCache();

            DB::commit(); // Если используем транзакцию

            Log::info("Настройка '{$optionKey}' обновлена на: "
                . $newValue . " пользователем ID: " . $request->user()?->id);
            return back()->with('success', $successMessage); // Возвращаем универсальное сообщение

        } catch (Throwable $e) {
            DB::rollBack(); // Если используем транзакцию
            Log::error("Ошибка обновления настройки '{$optionKey}': " . $e->getMessage());
            return back()->withInput()->withErrors(['value' => $errorMessage]); // Возвращаем универсальное сообщение
        }
    }

    // Публичные методы для показа количества строк (принимают общий UpdateCountSettingRequest)

    /**
     * Обновление количества элементов в настройках
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountSettings(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountSettings',
            'site_settings.AdminCountSettings',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в категориях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountCategories(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountCategories',
            'site_settings.AdminCountCategories',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в рубриках
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountProducts(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountProducts',
            'site_settings.AdminCountProducts',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в группах характеристик
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountPropertyGroups(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountPropertyGroups',
            'site_settings.AdminCountPropertyGroups',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в значениях характеристик
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountPropertyValues(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountPropertyValues',
            'site_settings.AdminCountPropertyValues',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в рубриках
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountRubrics(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountRubrics',
            'site_settings.AdminCountRubrics',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в секциях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountSections(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountSections',
            'site_settings.AdminCountSections',
            'number', 'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в статьях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountArticles(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountArticles',
            'site_settings.AdminCountArticles',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в тегах
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountTags(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountTags',
            'site_settings.AdminCountTags',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в комментариях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountComments(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountComments',
            'site_settings.AdminCountComments',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в баннерах
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountBanners(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountBanners',
            'site_settings.AdminCountBanners',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в видео
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountVideos(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountVideos',
            'site_settings.AdminCountVideos',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в пользователях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountUsers(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountUsers',
            'site_settings.AdminCountUsers',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в ролях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountRoles(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountRoles',
            'site_settings.AdminCountRoles',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в разрешениях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountPermissions(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountPermissions',
            'site_settings.AdminCountPermissions',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    /**
     * Обновление количества элементов в модулях
     *
     * @param UpdateCountSettingRequest $request
     * @return RedirectResponse
     */
    public function updateAdminCountPlugins(UpdateCountSettingRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminCountPlugins',
            'site_settings.AdminCountPlugins',
            'number',
            'admin',
            __('admin/controllers.count_pages_updated_success'),
            __('admin/controllers.count_pages_updated_error')
        );
    }

    // Публичные методы для сортировки (принимают общий UpdateSortRequest)

    /**
     * Обновляет сортировку элементов в настройках
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortSettings(UpdateSortRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $newValue = $validated['value'];
        $optionKey = 'AdminSortSettings'; // Ключ опции специфичен для метода
        $configKey = 'site_settings.AdminSortSettings'; // Ключ конфига специфичен

        try {
            Setting::updateOrCreate(
                ['option' => $optionKey],
                [
                    'value' => $newValue,
                    'type' => 'string',
                    'constant' => strtoupper($optionKey),
                    'category' => 'admin',
                    'activity' => true,
                ]
            );

            config([$configKey => $newValue]);
            $this->clearSettingsCache('setting_' . $optionKey);
            $this->clearSettingsCache();

            Log::info("Настройка '{$optionKey}' обновлена на: "
                . $newValue . " пользователем ID: " . $request->user()?->id);
            return back()
                ->with('success', __('admin/controllers.sort_pages_updated_success')); // Универсальное сообщение

        } catch (Throwable $e) {
            Log::error("Ошибка обновления настройки сортировки '{$optionKey}': " . $e->getMessage());
            return back()->withInput()
                ->with('error', __('admin/controllers.sort_pages_updated_error'));
        }
    }

    /**
     * Обновляет сортировку элементов в категориях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortCategories(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortCategories',
            'site_settings.AdminSortCategories',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в товаров
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortProducts(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortProducts',
            'site_settings.AdminSortProducts',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в группах характеристик
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortPropertyGroups(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortPropertyGroups',
            'site_settings.AdminSortPropertyGroups',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в значениях характеристик
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortPropertyValues(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortPropertyValues',
            'site_settings.AdminSortPropertyValues',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в рубриках
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortRubrics(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortRubrics',
            'site_settings.AdminSortRubrics',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в секциях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortSections(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortSections',
            'site_settings.AdminSortSections',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в статьях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortArticles(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortArticles',
            'site_settings.AdminSortArticles',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в тегах
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortTags(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortTags',
            'site_settings.AdminSortTags',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в комментариях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortComments(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortComments',
            'site_settings.AdminSortComments',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в баннерах
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortBanners(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortBanners',
            'site_settings.AdminSortBanners',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в видео
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortVideos(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortVideos',
            'site_settings.AdminSortVideos',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в пользователях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortUsers(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortUsers',
            'site_settings.AdminSortUsers',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в ролях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortRoles(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortRoles',
            'site_settings.AdminSortRoles',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в разрешениях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortPermissions(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortPermissions',
            'site_settings.AdminSortPermissions',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Обновляет сортировку элементов в модулях
     *
     * @param UpdateSortRequest $request
     * @return RedirectResponse
     */
    public function updateAdminSortPlugins(UpdateSortRequest $request): RedirectResponse
    {
        return $this->updateSettingAndRedirect(
            $request,
            'AdminSortPlugins',
            'site_settings.AdminSortPlugins',
            'string',
            'admin',
            __('admin/controllers.sort_pages_updated_success'),
            __('admin/controllers.sort_pages_updated_error')
        );
    }

    /**
     * Приватный метод для очистки кэша.
     *
     * @param string|null $specificKey
     * @return void
     */
    /**
     * Приватный метод для очистки кэша.
     * Исправлено для совместимости с RedisStore (используем цикл forget).
     */
    private function clearSettingsCache(string $specificKey = null): void
    {
        // TODO: Использовать ваши реальные базовые ключи кэша
        $keysToForget = ['site_settings', 'setting_locale', 'sidebar_settings'];
        if ($specificKey) {
            $keysToForget[] = $specificKey;
        }
        // Добавляем ключи для всех настроек count и sort
        try {
            $options = Setting::where('option', 'like', 'AdminCount%')
                ->orWhere('option', 'like', 'AdminSort%')
                // Добавим ключи сайдбара/виджета, если они есть в БД
                ->orWhereIn('option', ['AdminSidebarLightColor', ]) // Пример
                ->pluck('option');
            foreach ($options as $option) {
                $keysToForget[] = 'setting_' . $option; // Ключ для конкретной настройки
            }
        } catch (Throwable $e) {
            // Логируем ошибку получения опций, но не прерываем очистку основных ключей
            Log::error("Ошибка получения опций для очистки кэша: " . $e->getMessage());
        }

        // --- ИСПРАВЛЕНИЕ: Используем цикл Cache::forget() ---
        $uniqueKeys = array_unique($keysToForget);
        foreach ($uniqueKeys as $key) {
            if (!empty($key)) { // Пропускаем пустые ключи на всякий случай
                Cache::forget($key);
            }
        }
        // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

        Log::debug("Кэш настроек очищен.", ['keys_cleared' => $uniqueKeys]);
    }
}
