<?php

namespace App\Http\Requests\Admin\Parameter;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateParameterValueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'value' => 'nullable', // без условий
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateParameterValueRequest');
    }
}
