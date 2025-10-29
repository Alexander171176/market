<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkCurrencyRatesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $arr = $this->input('rates', []);
        $normalized = [];

        if (is_array($arr)) {
            foreach ($arr as $item) {
                $normalized[] = [
                    'base_currency_id'  => (int) ($item['base_currency_id'] ?? 0),
                    'quote_currency_id' => (int) ($item['quote_currency_id'] ?? 0),
                    'rate'              => (float) str_replace(',', '.', (string) ($item['rate'] ?? 0)),
                    'provider'          => trim((string) ($item['provider'] ?? 'manual')),
                    'is_manual'         => (bool) ($item['is_manual'] ?? true),
                ];
            }
        }

        $this->merge(['rates' => $normalized]);
    }

    public function rules(): array
    {
        $providers = config('currency.providers', ['manual']);

        return [
            'rates'                         => ['required','array','min:1'],
            'rates.*.base_currency_id'      => ['required','integer','exists:currencies,id'],
            'rates.*.quote_currency_id'     => ['required','integer','exists:currencies,id'],
            'rates.*.rate'                  => ['required','numeric','gt:0'],
            'rates.*.provider'              => ['nullable','string','max:50', Rule::in($providers)],
            'rates.*.is_manual'             => ['required','boolean'],

            // Локальное правило на «разные валюты» лучше проверить в контроллере при upsert,
            // но можно и так:
            // кастомная валидация в контроллере: base != quote для каждой записи
        ];
    }

    public function messages(): array
    {
        return [
            'rates.required' => 'Не передан массив курсов.',
        ];
    }
}
