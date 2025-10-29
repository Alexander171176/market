<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'activity' => (bool) $this->input('activity', true),
        ]);
    }

    public function rules(): array
    {
        return [
            'activity' => ['required','boolean'],
        ];
    }
}
