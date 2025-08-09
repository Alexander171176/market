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
        // имя параметра зависит от твоего Route Model Binding.
        // В контроллере у тебя метод: edit(PropertyValue $property_value)
        // => параметр называется 'property_value'
        $propertyValueId = $this->route('property_value')?->id;

        return [
            'sort'     => ['nullable', 'integer', 'min:0'],
            'activity' => ['required', 'boolean'],
            'locale'   => ['required', 'string', 'size:2'],

            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('property_values')
                    ->where(fn ($q) => $q->where('locale', $this->input('locale')))
                    ->ignore($propertyValueId),
            ],

            'slug' => [
                'required', 'string', 'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('property_values')
                    ->where(fn ($q) => $q->where('locale', $this->input('locale')))
                    ->ignore($propertyValueId),
            ],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
