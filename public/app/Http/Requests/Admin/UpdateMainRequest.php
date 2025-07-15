<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        // TODO: Проверка прав $this->authorize('update-main');
        return true;
    }
    public function rules(): array { return ['main' => 'required|boolean']; }
}
