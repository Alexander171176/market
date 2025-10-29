<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurrencyRateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'base_currency_id'  => (int) $this->input('base_currency_id'),
            'quote_currency_id' => (int) $this->input('quote_currency_id'),
            'rate'              => (float) str_replace(',', '.', (string) $this->input('rate')),
            'provider'          => trim((string) $this->input('provider', 'manual')),
            'is_manual'         => (bool) $this->input('is_manual', true),
        ]);
    }

    public function rules(): array
    {
        return [
            'base_currency_id'  => ['required','integer','exists:currencies,id'],
            'quote_currency_id' => ['required','integer','different:base_currency_id','exists:currencies,id'],
            'rate'              => ['required','numeric','gt:0'],
            'provider'          => ['nullable','string','max:50', Rule::in(config('currency.providers', ['manual']))],
            'is_manual'         => ['required','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'quote_currency_id.different' => 'Базовая и котируемая валюты должны отличаться.',
            'provider.in'                 => 'Недопустимый провайдер курса.',
        ];
    }
}
