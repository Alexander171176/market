<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
//    public function authorize(): bool
//    {
//        return true;
//    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user),
            ],
            'roles' => ['sometimes', 'array'],
            'permissions' => ['sometimes', 'array'],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateUserRequest');
    }
}
