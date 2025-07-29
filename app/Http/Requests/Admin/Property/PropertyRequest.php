<?php

namespace App\Http\Requests\Admin\Property;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class PropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $propertyId = $this->route('property')?->id;

        return [
            'property_group_id' => ['nullable', 'integer', 'exists:property_groups,id'],
            'sort'              => ['nullable', 'integer', 'min:0'],
            'activity'          => ['required', 'boolean'],
            'type'              => ['required', 'string', 'max:50'],
            'name'              => ['required', 'string', 'max:50'],
            'slug'              => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('properties')->ignore($propertyId),
            ],
            'description'       => ['nullable', 'string', 'max:255'],
            'all_categories'    => ['required', 'boolean'],
            'is_filterable'     => ['required', 'boolean'],
            'filter_type'       => ['required', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
