<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateActivityRequest extends FormRequest {
    public function authorize(): bool {
        // TODO: Проверка прав $this->authorize('update-activity');
        return true;
    }
    public function rules(): array { return ['activity' => 'required|boolean']; }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }
}
