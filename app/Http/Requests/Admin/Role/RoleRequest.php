<?php

namespace App\Http\Requests\Admin\Role;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use Spatie\Permission\PermissionRegistrar; // Импортируем для получения имен таблиц

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // $permission = $this->isMethod('POST') ? 'create roles' : 'update roles';
        // return $this->user()->can($permission);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем ID роли из маршрута (предполагаем имя параметра 'role')
        $roleId = $this->route('role')?->id ?? null;
        // Получаем имя таблицы ролей из конфига Spatie
        $rolesTable = config('permission.table_names.roles', 'roles');
        // Получаем имя таблицы разрешений из конфига Spatie
        $permissionsTable = config('permission.table_names.permissions', 'permissions');

        return [
            'name' => [
                'required',
                'string',
                'max:125', // Соответствует миграции Spatie для MySQL 8+
                Rule::unique($rolesTable, 'name') // Используем имя таблицы из конфига
                ->where(function ($query) {
                    // Учитываем guard_name (по умолчанию 'web')
                    return $query->where('guard_name', $this->input('guard_name', 'web'));
                })
                    ->ignore($roleId), // Игнорируем текущую роль при обновлении
            ],
            // Валидируем guard_name, если он передается (обычно нет, но на всякий случай)
            'guard_name' => ['sometimes', 'string', 'max:125'],

            // Валидация массива ID разрешений
            'permissions' => ['nullable', 'array'], // Массив может быть пустым
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/RoleRequest');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        // Если guard_name не передается, устанавливаем 'web' по умолчанию
        if (!$this->has('guard_name')) {
            $this->merge(['guard_name' => 'web']);
        }
    }
}
