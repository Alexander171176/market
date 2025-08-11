<?php

namespace App\Http\Controllers\Admin\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Property\PropertyRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Http\Resources\Admin\PropertyGroup\PropertyGroupResource;
use App\Http\Resources\Admin\PropertyValue\PropertyValueResource;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PropertyController extends Controller
{
    /**
     * Отображение списка всех Характеристик.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        $adminCountProperties = config('site_settings.AdminCountProperties', 15);
        $adminSortProperties  = config('site_settings.AdminSortProperties', 'idDesc');

        try {
            $properties = Property::query()
                ->with([
                    'values',
                    'group:id,name,locale'
                ])
                ->get();
            $propertiesCount = $properties->count();
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки характеристик для Index: " . $e->getMessage());
            $properties = collect();
            $propertiesCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Properties/Index', [
            'properties'           => PropertyResource::collection($properties),
            'propertiesCount'      => $propertiesCount,
            'adminCountProperties' => (int)$adminCountProperties,
            'adminSortProperties'  => $adminSortProperties,
        ]);
    }

    /**
     * Отображение формы создания новой характеристики.
     * Передает список значений для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        $values = PropertyValue::select('id', 'name', 'locale')
            ->orderBy('name')->get();

        // подгружаем группы
        $groups = PropertyGroup::select('id','name','locale')
            ->orderBy('name')->get();

        return Inertia::render('Admin/Properties/Create', [
            'values' => PropertyValueResource::collection($values),
            'groups' => PropertyGroupResource::collection($groups),
        ]);
    }

    /**
     * Сохранение новой характеристики в базе данных.
     * Использует PropertyRequest для валидации и авторизации.
     *
     * @param PropertyRequest $request
     * @return RedirectResponse Редирект на список характеристик с сообщением.
     */
    public function store(PropertyRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Достаём ids значений НЕ из $data, а прямо из запроса
        $raw = $request->input('values', $request->input('propertyValues', []));
        $valueIds = collect($raw)
            ->map(fn ($v) => is_array($v) ? ($v['id'] ?? null) : $v)
            ->filter()
            ->values()
            ->all();

        try {
            DB::beginTransaction();

            $property = Property::create($data);
            if (!empty($valueIds)) {
                $property->values()->sync($valueIds);
            }

            DB::commit();
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.created_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            // лог и возврат
            return back()->withInput()->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение формы редактирования существующей характеристики.
     * Использует Route Model Binding для получения модели.
     *
     * @param Property $property Модель характеристики, найденная по ID из маршрута.
     * @return Response
     */
    public function edit(Property $property): Response
    {
        $property->load('values','group');

        $propertyValues = PropertyValue::select('id','name','locale')->orderBy('name')->get();
        $groups = PropertyGroup::select('id','name','locale')->orderBy('name')->get();

        return Inertia::render('Admin/Properties/Edit', [
            'property'       => new PropertyResource($property),
            'propertyValues' => PropertyValueResource::collection($propertyValues),
            'groups'         => PropertyGroupResource::collection($groups),
        ]);
    }

    /**
     * Обновление существующей характеристики в базе данных.
     * Использует PropertyRequest и Route Model Binding.
     * Синхронизирует связанные значения, если они переданы.
     *
     * @param PropertyRequest $request Валидированный запрос.
     * @param Property $property Модель характеристики для обновления.
     * @return RedirectResponse Редирект на список характеристик с сообщением.
     */
    public function update(PropertyRequest $request, Property $property): RedirectResponse
    {
        $data = $request->validated();

        // Снова берём из запроса, а не из $data
        $raw = $request->input('values', $request->input('propertyValues', null));

        try {
            DB::beginTransaction();

            $property->update($data);

            if (is_array($raw)) {
                $valueIds = collect($raw)
                    ->map(fn ($v) => is_array($v) ? ($v['id'] ?? null) : $v)
                    ->filter()
                    ->values()
                    ->all();

                $property->values()->sync($valueIds);
            }

            DB::commit();
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            // лог и возврат
            return back()->withInput()->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанной характеристики.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Property $property Модель характеристики для удаления.
     * @return RedirectResponse Редирект на список характеристик с сообщением.
     */
    public function destroy(Property $property): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $propertyName = $property->name;
            $propertyId   = $property->id;

            // пивот удалится каскадом, если FK настроены с cascadeOnDelete
            $property->delete();

            DB::commit();

            Log::info("Характеристика удалена: ID {$propertyId}, Name: {$propertyName}");
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.deleted_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении характеристики ID {$property->id}: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Массовое удаление указанных характеристик.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'required|integer|exists:properties,id',
        ]);

        $propertyIds = $validated['ids'];

        try {
            DB::beginTransaction();

            Property::whereIn('id', $propertyIds)->delete();

            DB::commit();

            Log::info('Характеристики удалены: ', $propertyIds);
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.bulk_deleted_success', ['count' => count($propertyIds)]));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении характеристик: ".$e->getMessage(), ['ids' => $propertyIds]);
            return back()->with('error', __('admin/controllers.bulk_deleted_error'));
        }
    }

    /**
     * Обновление статуса активности характеристики.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Property $property Модель характеристики для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Property $property): RedirectResponse
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $property->activity = $validated['activity'];
            $property->save();

            DB::commit();

            Log::info("Обновлено activity характеристики ID {$property->id} на {$property->activity}");
            return back()->with('success', __('admin/controllers.activity_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности характеристики ID {$property->id}: ".$e->getMessage());
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
            'ids.*'    => 'required|integer|exists:properties,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();

            Property::whereIn('id', $validated['ids'])
                ->update(['activity' => $validated['activity']]);

            DB::commit();

            Log::info('Массово обновлена активность характеристик', [
                'count'    => count($validated['ids']),
                'activity' => $validated['activity'],
            ]);

            return back()->with('success', __('admin/controllers.bulk_activity_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности характеристик: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одной характеристики.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Property $property Модель характеристики для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Property $property): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $property->sort = $validated['sort'];
            $property->save();

            Log::info("Обновлено sort характеристики ID {$property->id} на {$property->sort}");
            return back()->with('success', __('admin/controllers.sort_updated_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки характеристики ID {$property->id}: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'properties'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'properties'         => 'required|array',
            'properties.*.id'    => ['required', 'integer', 'exists:properties,id'],
            'properties.*.sort'  => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['properties'] as $item) {
                Property::where('id', $item['id'])->update(['sort' => $item['sort']]);
            }

            DB::commit();

            Log::info('Массово обновлена сортировка характеристик', [
                'count' => count($validated['properties']),
            ]);

            return back()->with('success', __('admin/controllers.bulk_sort_updated_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки характеристик: ".$e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

    /**
     * Клонирование характеристики.
     * Копирует основные поля и связи с значениями.
     * Генерирует новые уникальные name и slug.
     *
     * @param Request $request (Не используется, но нужен для сигнатуры маршрута)
     * @param Property $property Модель характеристики для клонирования (через RMB).
     * @return RedirectResponse Редирект на список характеристик с сообщением.
     */
    public function clone(Request $request, Property $property): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $clonedProperty = $property->replicate();
            $clonedProperty->property_group_id = $property->property_group_id;
            $clonedProperty->activity  = false;
            $clonedProperty->type = $property->type;
            $clonedProperty->name      = $property->name . '-2';
            $clonedProperty->slug      = $property->slug . '-2';
            $clonedProperty->description = $property->description;
            $clonedProperty->is_filterable = $property->is_filterable;
            $clonedProperty->filter_type = $property->filter_type;
            $clonedProperty->created_at = now();
            $clonedProperty->updated_at = now();
            $clonedProperty->save();

            // копируем привязанные значения через связь values()
            $valueIds = $property->values()->pluck('id')->toArray();
            $clonedProperty->values()->sync($valueIds);

            DB::commit();

            Log::info("Характеристика ID {$property->id} успешно клонирована в ID {$clonedProperty->id}");
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.cloned_success'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при клонировании характеристики ID {$property->id}: ".$e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()->with('error', __('admin/controllers.cloned_error'));
        }
    }
}
