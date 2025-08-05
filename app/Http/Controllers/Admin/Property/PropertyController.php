<?php

namespace App\Http\Controllers\Admin\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Property\PropertyRequest;
use App\Http\Requests\Admin\PropertyValue\PropertyValueRequest;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PropertyController extends Controller
{
    public function index(): Response
    {
        // TODO: authorize
        $properties = Property::with(['group', 'values'])->orderBy('sort')->get();
        $groups = PropertyGroup::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Properties/Index', [
            'properties' => PropertyResource::collection($properties),
            'groups' => $groups,
        ]);
    }

    public function store(PropertyRequest $request): RedirectResponse
    {
        // TODO: authorize
        try {
            Property::create($request->validated());
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.created_success'));
        } catch (Throwable $e) {
            Log::error('Ошибка создания характеристики', ['error' => $e->getMessage()]);
            return back()->with('error', __('admin/controllers.created_error'));
        }
    }

    public function update(PropertyRequest $request, Property $property): RedirectResponse
    {
        // TODO: authorize
        try {
            $property->update($request->validated());
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.updated_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления характеристики ID {$property->id}",
                ['error' => $e->getMessage()]);
            return back()->with('error', __('admin/controllers.updated_error'));
        }
    }

    public function destroy(Property $property): RedirectResponse
    {
        // TODO: authorize
        try {
            $property->delete();
            return redirect()->route('admin.properties.index')
                ->with('success', __('admin/controllers.deleted_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка удаления характеристики ID {$property->id}",
                ['error' => $e->getMessage()]);
            return back()->with('error', __('admin/controllers.deleted_error'));
        }
    }

    // --- Методы для управления значениями ---

    public function storeValue(PropertyValueRequest $request, Property $property): RedirectResponse
    {
        try {
            $property->values()->create($request->validated());
            return back()->with('success', 'Значение добавлено.');
        } catch (Throwable $e) {
            Log::error("Ошибка добавления значения к характеристике ID {$property->id}",
                ['error' => $e->getMessage()]);
            return back()->with('error', 'Ошибка добавления значения.');
        }
    }

    public function updateValue(PropertyValueRequest $request, PropertyValue $propertyValue): RedirectResponse
    {
        try {
            $propertyValue->update($request->validated());
            return back()->with('success', 'Значение обновлено.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления значения ID {$propertyValue->id}",
                ['error' => $e->getMessage()]);
            return back()->with('error', 'Ошибка обновления значения.');
        }
    }

    public function destroyValue(PropertyValue $propertyValue): RedirectResponse
    {
        try {
            $propertyValue->delete();
            return back()->with('success', 'Значение удалено.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления значения ID {$propertyValue->id}",
                ['error' => $e->getMessage()]);
            return back()->with('error', 'Ошибка удаления значения.');
        }
    }
}
