<?php

namespace App\Http\Requests\Admin\PropertyValue;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class PropertyValueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $propertyValueId = $this->route('property_value')?->id;
        $propertyId = $this->input('property_id');

        return [
            'property_id' => [
                'required',
                'integer',
                'exists:properties,id',
            ],
            'sort' => [
                'nullable',
                'integer',
                'min:0',
            ],
            'value' => [
                'required',
                'string',
                'max:255',
                Rule::unique('property_values')
                    ->where(fn ($query) => $query->where('property_id', $propertyId))
                    ->ignore($propertyValueId),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            ],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
