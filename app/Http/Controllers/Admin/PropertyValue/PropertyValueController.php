<?php

namespace App\Http\Controllers\Admin\PropertyValue;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PropertyValue\PropertyValueRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Http\Resources\Admin\PropertyValue\PropertyValueResource;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Значениями характеристик в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\PropertyValue\PropertyValue Модель группы
 * @see \App\Http\Requests\Admin\PropertyValue\PropertyValueRequest Запрос для создания/обновления
 */
class PropertyValueController extends Controller
{
    /**
     * Отображение списка всех Значений характеристик.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        $adminCountValues = (int) config('site_settings.AdminCountPropertyValues', 15);
        $adminSortValues  = config('site_settings.AdminSortPropertyValues', 'idDesc');

        try {
            $values = PropertyValue::query()
                ->withCount('properties')     // только счетчик связей many-to-many
                ->orderBy('sort')
                ->get();

            $valuesCount = $values->count();
        } catch (Throwable $e) {
            Log::error('Ошибка загрузки значений характеристик: '.$e->getMessage());
            $values = collect();
            $valuesCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/PropertyValues/Index', [
            'values'           => PropertyValueResource::collection($values),
            'valuesCount'      => $valuesCount,
            'adminCountValues' => $adminCountValues,
            'adminSortValues'  => $adminSortValues,
        ]);
    }

    /**
     * Отображение формы создания нового значения характеристики.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Admin/PropertyValues/Create');
    }

    /**
     * Сохранение нового значения характеристики в базе данных.
     * Использует PropertyValueRequest для валидации и авторизации.
     *
     * @param PropertyValueRequest $request
     * @return RedirectResponse
     */
    public function store(PropertyValueRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            PropertyValue::create($data);
            DB::commit();

            Log::info('Значение характеристики создано', $data);
            return to_route('admin.property-values.index')
                ->with('success', __('admin/controllers.created_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка при создании значения характеристики: '.$e->getMessage(), ['data' => $data]);
            return back()->withInput()->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение формы редактирования существующего значения характеристики.
     * Использует Route Model Binding для получения модели.
     *
     * @param PropertyValue $propertyValue
     * @return Response
     */
    public function edit(PropertyValue $propertyValue): Response
    {
        return Inertia::render('Admin/PropertyValues/Edit', [
            'propertyValue' => new PropertyValueResource($propertyValue),
        ]);
    }

    /**
     * Обновление существующего значения характеристики в базе данных.
     * Использует PropertyValueRequest и Route Model Binding.
     *
     * @param PropertyValueRequest $request
     * @param PropertyValue $propertyValue
     * @return RedirectResponse
     */
    public function update(PropertyValueRequest $request, PropertyValue $propertyValue): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $propertyValue->update($data);
            DB::commit();

            Log::info("Значение характеристики ID {$propertyValue->id} обновлено");
            return to_route('admin.property-values.index')
                ->with('success', __('admin/controllers.updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления значения ID {$propertyValue->id}: ".$e->getMessage(), ['data' => $data]);
            return back()->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанного значения характеристики.
     * Использует Route Model Binding.
     *
     * @param PropertyValue $propertyValue
     * @return RedirectResponse
     */
    public function destroy(PropertyValue $propertyValue): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $propertyValue->delete();
            DB::commit();

            Log::info("Значение характеристики ID {$propertyValue->id} удалено");
            return to_route('admin.property-values.index')
                ->with('success', __('admin/controllers.deleted_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка удаления значения ID {$propertyValue->id}: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Массовое удаление указанного значения характеристики.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'required|integer|exists:property_values,id',
        ]);

        try {
            DB::beginTransaction();
            PropertyValue::whereIn('id', $validated['ids'])->delete();
            DB::commit();

            Log::info('Массовое удаление значений', $validated['ids']);
            return back()->with('success', __('admin/controllers.bulk_deleted_success', [
                'count' => count($validated['ids']),
            ]));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка массового удаления значений: '.$e->getMessage(), ['ids' => $validated['ids']]);
            return back()->with('error', __('admin/controllers.bulk_deleted_error'));
        }
    }

    /**
     * Обновление статуса активности значения характеристики.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request
     * @param PropertyValue $propertyValue
     * @return RedirectResponse
     */
    public function updateActivity(UpdateActivityRequest $request, PropertyValue $propertyValue): RedirectResponse
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $propertyValue->activity = $validated['activity'];
            $propertyValue->save();
            DB::commit();

            Log::info("Обновлено activity значения ID {$propertyValue->id}");
            return back()->with('success', __('admin/controllers.activity_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности значения ID {$propertyValue->id}: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.activity_updated_error'));
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
            'ids.*'    => 'required|integer|exists:property_values,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();
            PropertyValue::whereIn('id', $validated['ids'])
                ->update(['activity' => $validated['activity']]);
            DB::commit();

            Log::info('Массовое обновление активности значений', [
                'count'    => count($validated['ids']),
                'activity' => $validated['activity'],
            ]);

            return back()->with('success', __('admin/controllers.bulk_activity_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка массового обновления активности значений: '.$e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одного значения характеристики.
     * Использует Route Model Binding и UpdateSortEntityRequest.
     *
     * @param UpdateSortEntityRequest $request
     * @param PropertyValue $propertyValue
     * @return RedirectResponse
     */
    public function updateSort(UpdateSortEntityRequest $request, PropertyValue $propertyValue): RedirectResponse
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $propertyValue->sort = $validated['sort'];
            $propertyValue->save();
            DB::commit();

            Log::info("Обновлено sort значения ID {$propertyValue->id}");
            return back()->with('success', __('admin/controllers.sort_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления сортировки значения ID {$propertyValue->id}: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'propertyValues'        => 'required|array',
            'propertyValues.*.id'   => 'required|integer|exists:property_values,id',
            'propertyValues.*.sort' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['propertyValues'] as $item) {
                PropertyValue::where('id', $item['id'])->update(['sort' => $item['sort']]);
            }

            DB::commit();

            Log::info('Массовое обновление сортировки значений', [
                'count' => count($validated['propertyValues']),
            ]);

            return back()->with('success', __('admin/controllers.bulk_sort_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка массового обновления сортировки значений: '.$e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }
}
