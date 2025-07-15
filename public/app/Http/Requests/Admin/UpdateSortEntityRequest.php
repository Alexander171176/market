<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateSortEntityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку права (например, 'update-entities-sort')
        // Или оставить true, если проверка делается в контроллере/политике
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sort' => ['required', 'integer', 'min:0'], // Теперь валидируем поле 'sort' как целое неотрицательное число
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateSortEntityRequest');
    }
}
