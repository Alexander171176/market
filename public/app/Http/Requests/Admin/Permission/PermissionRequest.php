<?php

namespace App\Http\Requests\Admin\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class PermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // $permissionAction = $this->isMethod('POST') ? 'create permissions' : 'update permissions';
        // return $this->user()->can($permissionAction);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем ID разрешения из маршрута (предполагаем имя параметра 'permission')
        $permissionId = $this->route('permission')?->id ?? null;
        // Получаем имя таблицы разрешений из конфига Spatie
        $permissionsTable = config('permission.table_names.permissions', 'permissions');

        return [
            'name' => [
                'required',
                'string',
                'max:125', // Соответствует миграции Spatie для MySQL 8+
                Rule::unique($permissionsTable, 'name') // Используем имя таблицы из конфига
                ->where(function ($query) {
                    // Учитываем guard_name (по умолчанию 'web')
                    return $query->where('guard_name', $this->input('guard_name', 'web'));
                })
                    ->ignore($permissionId), // Игнорируем текущее разрешение при обновлении
            ],
            // Валидируем guard_name, если он передается
            'guard_name' => ['sometimes', 'string', 'max:125'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/PermissionRequest');
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
