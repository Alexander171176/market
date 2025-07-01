<?php

namespace App\Http\Requests\Admin\Setting;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSidebarSettingsRequest extends FormRequest
{
    public function authorize(): bool {
        // TODO: Проверка прав $this->authorize('update-sidebar settings');
        return true;
    }
   public function rules(): array {
        return [
            'color' => 'required|string|regex:/^[0-9A-Fa-f]{6}$/',
            'opacity' => 'required|numeric|min:0|max:1'
        ];
    }
}
