<?php

namespace App\Http\Requests\Admin\PropertyGroup;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

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
        $propertyGroupId = $this->route('property_group')?->id
            ?? $this->route('propertyGroup')?->id;

        return [
            'sort'     => ['nullable', 'integer', 'min:0'],
            'activity' => ['required', 'boolean'],
            'locale'   => ['required', 'string', 'size:2'],
            'name'        => [
                'required', 'string', 'max:255',
                Rule::unique('property_groups', 'name')
                    ->where(fn ($q) => $q->where('locale', $this->input('locale')))
                    ->ignore($propertyGroupId),
            ],

            'properties' => ['nullable', 'array'],
            'properties.*.id' => ['required_with:properties', 'integer', 'exists:properties,id'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках.
     */
    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
