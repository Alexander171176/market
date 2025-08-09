<?php

namespace App\Http\Controllers\Admin\PropertyValue;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PropertyValue\PropertyValueResource;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления значениями характеристик в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\PropertyValue\PropertyValue Модель
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
        // TODO: $this->authorize('viewAny', PropertyValue::class);

        $adminCountValues = (int) config('site_settings.AdminCountPropertyValues', 15);
        $adminSortValues  = config('site_settings.AdminSortPropertyValues', 'idDesc');

        try {
            $values = PropertyValue::query()
                ->with(['property:id,name']) // НЕ 'properties'
                ->orderBy('sort')
                ->get();

            $valuesCount = $values->count();
        } catch (Throwable $e) {
            Log::error('Ошибка загрузки значений характеристик для Index: '.$e->getMessage());
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
