<?php

namespace App\Http\Controllers\Admin\PropertyGroup;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PropertyGroup\PropertyGroupRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Http\Resources\Admin\PropertyGroup\PropertyGroupResource;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Группами характеристик в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\PropertyGroup\PropertyGroup Модель группы
 * @see \App\Http\Requests\Admin\PropertyGroup\PropertyGroupRequest Запрос для создания/обновления
 */
class PropertyGroupController extends Controller
{
    /**
     * Отображение списка всех Групп характеристик.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('show-property-groups', PropertyGroup::class);

        $adminCountGroups = config('site_settings.AdminCountPropertyGroups', 15);
        $adminSortGroups = config('site_settings.AdminSortPropertyGroups', 'idDesc');

        try {
            $groups = PropertyGroup::with('properties')->orderBy('sort')->get();
            $groupsCount = $groups->count(); // Считаем из загруженной коллекции
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки групп характеристик для Index: " . $e->getMessage());
            $groups = collect(); // Пустая коллекция в случае ошибки
            $groupsCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/PropertyGroups/Index', [
            'groups' => PropertyGroupResource::collection($groups),
            'groupsCount' => $groupsCount,
            'adminCountGroups' => (int)$adminCountGroups,
            'adminSortGroups' => $adminSortGroups,
        ]);
    }

    /**
     * Отображение формы создания новой группы.
     * Передает список хапвктеристик для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-property-groups', PropertyGroup::class);
        $properties = Property::select('id', 'name', 'locale')->orderBy('name')->get(); // характеристики

        return Inertia::render('Admin/PropertyGroups/Create', [
            'properties' => PropertyResource::collection($properties),
        ]);
    }

    /**
     * Сохранение новой группы характеристик в базе данных.
     * Использует PropertyGroupRequest для валидации и авторизации.
     * Синхронизирует связанные характеристики.
     *
     * @param PropertyGroupRequest $request
     * @return RedirectResponse Редирект на список группы с сообщением.
     */
    public function store(PropertyGroupRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // ожидаем, что из формы приходит либо массив объектов {id,...},
        // либо сразу массив id — поддержим оба варианта
        $propertyIds = collect($data['properties'] ?? [])
            ->map(fn($v) => is_array($v) ? ($v['id'] ?? null) : $v)
            ->filter()
            ->values()
            ->all();

        unset($data['properties']);

        try {
            DB::beginTransaction();

            $group = PropertyGroup::create($data);

            if (!empty($propertyIds)) {
                // привязываем выбранные характеристики к созданной группе
                Property::whereIn('id', $propertyIds)
                    ->update(['property_group_id' => $group->id]);
            }

            DB::commit();

            Log::info('Группа характеристик создана', $group->toArray());
            return redirect()->route('admin.property-groups.index')
                ->with('success', __('admin/controllers.created_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании группы характеристик: ".$e->getMessage(), ['trace'=>$e->getTraceAsString()]);
            return back()->withInput()->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение формы редактирования существующей группы.
     * Использует Route Model Binding для получения модели.
     *
     * @param PropertyGroup $propertyGroup Модель группы, найденный по ID из маршрута.
     * @return Response
     */
    public function edit(PropertyGroup $propertyGroup): Response
    {
        // TODO: Проверка прав $this->authorize('update-property-groups', $propertyGroup);

        // Загружаем все необходимые связи
        $propertyGroup->load([
            'properties',
        ]);

        $properties = Property::select('id', 'name', 'locale')->orderBy('name')->get();

        return Inertia::render('Admin/PropertyGroups/Edit', [
            'propertyGroup' => new PropertyGroupResource($propertyGroup),
            'properties' => PropertyResource::collection($properties),
        ]);
    }

    /**
     * Обновление существующей группы в базе данных.
     * Использует PropertyGroupRequest и Route Model Binding.
     * Синхронизирует связанные характеристики если они переданы.
     *
     * @param PropertyGroupRequest $request Валидированный запрос.
     * @param PropertyGroup $propertyGroup Модель группы для обновления.
     * @return RedirectResponse Редирект на список групп с сообщением.
     */
    public function update(PropertyGroupRequest $request, PropertyGroup $propertyGroup): RedirectResponse
    {
        $data = $request->validated();

        $propertyIds = collect($data['properties'] ?? [])
            ->map(fn($v) => is_array($v) ? ($v['id'] ?? null) : $v)
            ->filter()
            ->values()
            ->all();

        unset($data['properties']);

        try {
            DB::beginTransaction();

            $propertyGroup->update($data);

            if (is_array($propertyIds)) {
                // 1) отвяжем все свойства, которые были в группе, но не выбраны сейчас
                Property::where('property_group_id', $propertyGroup->id)
                    ->whereNotIn('id', $propertyIds ?: [-1])
                    ->update(['property_group_id' => null]);

                // 2) привяжем выбранные
                if (!empty($propertyIds)) {
                    Property::whereIn('id', $propertyIds)
                        ->update(['property_group_id' => $propertyGroup->id]);
                }
            }

            DB::commit();

            Log::info("Группа характеристик ID {$propertyGroup->id} обновлена");
            return redirect()->route('admin.property-groups.index')
                ->with('success', __('admin/controllers.updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления группы характеристик ID {$propertyGroup->id}", ['error'=>$e->getMessage()]);
            return back()->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанной группы.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param PropertyGroup $propertyGroup Модель групп для удаления.
     * @return RedirectResponse Редирект на список групп с сообщением.
     */
    public function destroy(PropertyGroup $propertyGroup): RedirectResponse
    {
        // TODO: $this->authorize('delete', $propertyGroup);
        try {
            $propertyGroup->delete();
            Log::info("Группа характеристик ID {$propertyGroup->id} удалена");
            return redirect()->route('admin.property-groups.index')
                ->with('success', __('admin/controllers.deleted_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка удаления группы характеристик ID {$propertyGroup->id}", ['error' => $e->getMessage()]);
            return back()->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Массовое удаление указанных групп.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-property-groups');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:property_groups,id',
        ]);

        $propertyGroupsIds = $validated['ids'];
        $count = count($propertyGroupsIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции
            PropertyGroup::whereIn('id', $propertyGroupsIds)->delete();
            DB::commit();

            Log::info('Группы характеристик удалены: ', $propertyGroupsIds);
            return redirect()->route('admin.property-groups.index')
                ->with('success', __('admin/controllers.bulk_deleted_success',
                    ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении групп: "
                . $e->getMessage(), ['ids' => $propertyGroupsIds]);
            return back()
                ->with('error', __('admin/controllers.bulk_deleted_error'));
        }
    }

    /**
     * Обновление статуса активности группы.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param PropertyGroup $propertyGroup Модель группы для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, PropertyGroup $propertyGroup): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            $propertyGroup->activity = $validated['activity'];
            $propertyGroup->save();

            Log::info("Обновлено activity группы характеристик ID {$propertyGroup->id} на {$propertyGroup->activity}");
            return back()
                ->with('success', __('admin/controllers.activity_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности группы характеристик ID {$propertyGroup->id}: "
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
        // TODO: $this->authorize('update-property-groups');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:property_groups,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();

            PropertyGroup::whereIn('id', $validated['ids'])
                ->update(['activity' => $validated['activity']]);

            DB::commit();

            Log::info('Массово обновлена активность', [
                'count' => count($validated['ids']),
                'activity' => $validated['activity']
            ]);

            return back()->with('success', __('admin/controllers.bulk_activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности: " . $e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одной группы.
     * Использует Route Model Binding и UpdateSortEntityRequest.
     *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param PropertyGroup $propertyGroup Модель группы для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, PropertyGroup $propertyGroup): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $propertyGroup->sort = $validated['sort'];
            $propertyGroup->save();
            Log::info("Обновлено sort группы характеристик ID {$propertyGroup->id} на {$propertyGroup->sort}");
            return back()
                ->with('success', __('admin/controllers.sort_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки группы характеристик ID {$propertyGroup->id}: "
                . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'propertyGroups'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-property-groups');

        $validated = $request->validate([
            'propertyGroups' => 'required|array',
            'propertyGroups.*.id' => ['required', 'integer', 'exists:property_groups,id'],
            'propertyGroups.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['propertyGroups'] as $item) {
                PropertyGroup::where('id', $item['id'])->update([
                    'sort' => $item['sort']
                ]);
            }

            DB::commit();

            Log::info('Массово обновлена сортировка групп характеристик', [
                'count' => count($validated['propertyGroups']),
            ]);

            return back()->with('success', __('admin/controllers.bulk_sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();

            Log::error("Ошибка массового обновления сортировки групп характеристик: " . $e->getMessage());

            return back()->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

}
