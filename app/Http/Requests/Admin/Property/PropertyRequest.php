<?php

namespace App\Http\Requests\Admin\Property;

use Illuminate\Foundation\Http\FormRequest;
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
        return [
            'property_group_id.integer'     => 'ID группы должен быть целым числом.',
            'property_group_id.exists'      => 'Выбранная группа не найдена.',

            'sort.integer'                  => 'Поле сортировки должно быть целым числом.',
            'sort.min'                      => 'Сортировка не может быть меньше нуля.',

            'activity.required'             => 'Поле активности обязательно.',
            'activity.boolean'              => 'Поле активности должно быть логическим значением.',

            'type.required'                 => 'Укажите тип характеристики.',
            'type.string'                   => 'Тип должен быть строкой.',
            'type.max'                      => 'Тип не должен превышать 50 символов.',

            'name.required'                 => 'Укажите название характеристики.',
            'name.string'                   => 'Название должно быть строкой.',
            'name.max'                      => 'Название не должно превышать 50 символов.',

            'slug.required'                 => 'Поле slug обязательно.',
            'slug.string'                   => 'Slug должен быть строкой.',
            'slug.max'                      => 'Slug не должен превышать 255 символов.',
            'slug.regex'                    => 'Slug может содержать только строчные буквы, цифры и дефисы.',
            'slug.unique'                   => 'Такой slug уже существует.',

            'description.string'            => 'Описание должно быть строкой.',
            'description.max'               => 'Описание не должно превышать 255 символов.',

            'all_categories.required'       => 'Укажите, применяется ли ко всем категориям.',
            'all_categories.boolean'        => 'Значение должно быть логическим.',

            'is_filterable.required'        => 'Укажите, фильтруется ли характеристика.',
            'is_filterable.boolean'         => 'Значение должно быть логическим.',

            'filter_type.required'          => 'Укажите тип фильтра.',
            'filter_type.string'            => 'Тип фильтра должен быть строкой.',
            'filter_type.max'               => 'Тип фильтра не должен превышать 50 символов.',
        ];
    }
}
