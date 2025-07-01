<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActivityRequest extends FormRequest {
    public function authorize(): bool {
        // TODO: Проверка прав $this->authorize('update-activity');
        return true;
    }
    public function rules(): array { return ['activity' => 'required|boolean']; }
}
