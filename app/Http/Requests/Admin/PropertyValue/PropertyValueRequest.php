<?php

namespace App\Http\Requests\Admin\PropertyValue;

use Illuminate\Foundation\Http\FormRequest;
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
        return [
            'property_id.required' => 'Необходимо указать характеристику.',
            'property_id.integer'  => 'Поле характеристики должно быть числом.',
            'property_id.exists'   => 'Указанная характеристика не найдена.',

            'sort.integer'         => 'Поле сортировки должно быть числом.',
            'sort.min'             => 'Поле сортировки не может быть меньше нуля.',

            'value.required'       => 'Необходимо указать значение.',
            'value.string'         => 'Значение должно быть строкой.',
            'value.max'            => 'Значение не должно превышать 255 символов.',
            'value.unique'         => 'Такое значение уже существует в рамках данной характеристики.',

            'slug.string'          => 'Slug должен быть строкой.',
            'slug.max'             => 'Slug не должен превышать 255 символов.',
            'slug.regex'           => 'Slug может содержать только строчные латинские буквы, цифры и дефисы.',
        ];
    }
}
