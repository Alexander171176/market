<?php

namespace App\Http\Requests\Admin\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateWidgetPanelRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO: Проверка права 'update settings'
        return $this->user()->can('update settings');
        // return true;
    }

    public function rules(): array
    {
        return [
            // Валидация HEX цвета без #
            'color' => ['required', 'string', 'regex:/^[0-9A-Fa-f]{6}$/'],
            // Валидация прозрачности (число от 0 до 1)
            'opacity' => 'required|numeric|min:0|max:1',
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateWidgetPanelRequest');
    }
}
