<?php

namespace App\Http\Requests\Admin\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateSettingValueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'value' => 'nullable', // без условий
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateSettingValueRequest');
    }
}
