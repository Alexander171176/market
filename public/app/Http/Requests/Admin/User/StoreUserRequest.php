<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'roles' => ['nullable', 'array'],
            'permissions' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/StoreUserRequest');
    }
}
