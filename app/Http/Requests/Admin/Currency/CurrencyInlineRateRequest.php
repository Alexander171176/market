<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyInlineRateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // курс QUOTE за 1 BASE
            'rate'     => ['required','numeric','gt:0','max:999999999'],
            'provider' => ['nullable','string','max:64'],
        ];
    }

    public function messages(): array
    {
        return [
            'rate.required' => 'Введите курс.',
            'rate.numeric'  => 'Курс должен быть числом.',
            'rate.gt'       => 'Курс должен быть больше нуля.',
        ];
    }
}
