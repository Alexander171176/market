<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FetchRatesFromProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'provider'         => trim((string) $this->input('provider', config('currency.default_provider','manual'))),
            'base_currency_id' => (int) $this->input('base_currency_id'),
            'quote_ids'        => array_map('intval', (array) $this->input('quote_ids', [])),
        ]);
    }

    public function rules(): array
    {
        return [
            'provider'         => ['required','string','max:50', Rule::in(config('currency.providers', ['manual']))],
            'base_currency_id' => ['required','integer','exists:currencies,id'],
            'quote_ids'        => ['required','array','min:1'],
            'quote_ids.*'      => ['integer','exists:currencies,id','different:base_currency_id'],
        ];
    }

    public function messages(): array
    {
        return [
            'quote_ids.required' => 'Нужно указать хотя бы одну целевую валюту.',
            'quote_ids.*.different' => 'ID базовой и целевой валюты в списке не должны совпадать.',
        ];
    }
}
