<?php

namespace App\Http\Requests\Admin\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class UpdateSortSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Проверяем, есть ли у пользователя роль 'admin', 'editor'
        // return $this->user()->hasRole('admin', 'editor');
        // ----------------------------------------------------------------------------------

        // Проверяем, есть ли у пользователя хотя бы одна из ролей: 'admin' или 'editor'
        // return $this->user()->hasAnyRole(['admin', 'editor']);

        // Или так:
        // return $this->user()->hasAnyRole('admin|editor');

        // С указанием guard:
        // return $this->user()->hasAnyRole(['admin', 'editor'], 'web');
        // ----------------------------------------------------------------------------------

        // Проверяем, есть ли у пользователя ОБЕ роли: 'editor' И 'publisher'
        // return $this->user()->hasAllRoles(['editor', 'publisher']);

        // С указанием guard:
        // return $this->user()->hasAllRoles(['editor', 'publisher'], 'web');
        // ----------------------------------------------------------------------------------

        // Это стандартный и рекомендуемый способ интеграции системы прав доступа (разрешений)
        // spatie/laravel-permission с авторизацией запросов в Laravel
        // return $this->user()->can('update settings');
        // ----------------------------------------------------------------------------------

        // Метод auth()->check() проверяет, аутентифицирован ли пользователь.
        // Если да, возвращаем true, если нет (гость), возвращаем false.
        // Middleware 'auth:sanctum' на самом маршруте уже не пропустит гостя.
        return auth()->check();
        // ----------------------------------------------------------------------------------

        // Или можно просто оставить return true;, т.к. middleware 'auth:sanctum'
        // уже гарантирует, что пользователь аутентифицирован, если запрос дошел сюда.
        // return true;
    }

    public function rules(): array
    {
        return [
            // Просто проверяем, что значение передано и является строкой
            // все возможные типы сортировок проверяет SettingController в методе getAllowedSortValuesFor
            'value' => ['string', 'max:50'], // Добавим max для безопасности
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateSortSettingRequest');
    }
}
