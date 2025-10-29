<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurrencyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // включи Policy/Gate при необходимости
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            // приводим типы и нормализуем
            'sort'          => $this->filled('sort') ? (int) $this->input('sort') : 0,
            'code'          => strtoupper(trim((string) $this->input('code'))),
            'name'          => trim((string) $this->input('name')),
            'symbol'        => (string) $this->input('symbol', ''),
            'precision'     => (int) $this->input('precision', 2),
            'symbol_first'  => $this->boolean('symbol_first'),   // безопасное булево
            'thousands_sep' => (string) $this->input('thousands_sep', ' '),
            'decimal_sep'   => (string) $this->input('decimal_sep', '.'),
            'activity'      => $this->boolean('activity'),        // безопасное булево
            // is_default меняется отдельным запросом (SetDefault)
        ]);

        // если поле symbol_first не передали — примем дефолт из миграции (false)
        if (!$this->has('symbol_first')) {
            $this->merge(['symbol_first' => false]);
        }
        // если activity не передали — пусть будет true по умолчанию
        if (!$this->has('activity')) {
            $this->merge(['activity' => true]);
        }
    }

    public function rules(): array
    {
        // поддержка Route Model Binding и передачи id напрямую
        $currencyId = $this->route('currency')?->id
            ?? $this->input('id');

        return [
            'sort'          => ['nullable','integer','min:0'],
            'code'          => [
                'required','string','size:3','regex:/^[A-Z]{3}$/',
                Rule::unique('currencies', 'code')->ignore($currencyId),
            ],
            'name'          => ['required','string','max:100'],
            'symbol'        => ['nullable','string','max:8'],
            'precision'     => ['required','integer','min:0','max:6'],
            'symbol_first'  => ['required','boolean'],
            'thousands_sep' => ['required','string','max:2'],
            'decimal_sep'   => ['required','string','max:1','different:thousands_sep'],
            'activity'      => ['required','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.regex'            => 'Код должен быть в формате ISO-4217 (три заглавные буквы).',
            'decimal_sep.different' => 'Десятичный разделитель не может совпадать с разделителем тысяч.',
        ];
    }
}
