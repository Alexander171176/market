<?php

namespace App\Http\Requests\Admin\PropertyGroup;

use Illuminate\Foundation\Http\FormRequest;

class PropertyGroupRequest extends FormRequest
{
    /**
     * Определяет, авторизован ли пользователь.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Правила валидации.
     */
    public function rules(): array
    {
        return [
            'sort'     => ['nullable', 'integer', 'min:0'],
            'activity' => ['required', 'boolean'],
            'name'     => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках.
     */
    public function messages(): array
    {
        return [
            'sort.integer'        => 'Поле сортировки должно быть целым числом.',
            'sort.min'            => 'Сортировка не может быть меньше нуля.',
            'activity.required'   => 'Поле активности обязательно для заполнения.',
            'activity.boolean'    => 'Поле активности должно быть логическим значением.',
            'name.required'       => 'Пожалуйста, укажите название группы характеристик.',
            'name.string'         => 'Название должно быть строкой.',
            'name.max'            => 'Название не должно превышать 255 символов.',
        ];
    }
}
