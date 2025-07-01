<?php

namespace App\Http\Requests\Admin\Parameter;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class ParameterRequest extends FormRequest
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
            'sort' => 'nullable|integer|min:0',
            'activity' => 'required|boolean',
            'type' => [
                'nullable', 'string', 'max:255',
                Rule::in(['string', 'text', 'number', 'integer', 'float', 'boolean', 'checkbox', 'json', 'array', 'select']),
            ],
            'option' => [
                'required', 'string', 'max:255',
                Rule::unique('settings', 'option')->ignore($this->route('parameter')),
            ],
            'value' => 'nullable', // без условий
            'constant' => [
                'required', 'string', 'max:255', 'regex:/^[A-Z][A-Z0-9_]*$/',
                Rule::unique('settings', 'constant')->ignore($this->route('parameter')),
            ],
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:65535',
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/SettingRequest');
    }
}
