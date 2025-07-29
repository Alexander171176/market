<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateLeftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        // TODO: Проверка прав $this->authorize('update-left');
        return true;
    }
    public function rules(): array { return ['left' => 'required|boolean']; }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
