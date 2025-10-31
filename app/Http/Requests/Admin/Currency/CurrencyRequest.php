<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurrencyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Включите Policy/Gate при необходимости
    }

    /**
     * Нормализуем вход ДО валидации:
     * - код в верхний регистр
     * - дефолты для полей
     * - булевы флаги через boolean()
     * ВАЖНО: thousands_sep / decimal_sep тут оставляем ТОКЕНАМИ, не трогаем!
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sort'          => $this->filled('sort') ? (int) $this->input('sort') : 0,
            'code'          => strtoupper(trim((string) $this->input('code'))),
            'name'          => trim((string) $this->input('name')),
            'symbol'        => (string) $this->input('symbol', ''),
            'precision'     => (int) $this->input('precision', 2),
            'symbol_first'  => $this->boolean('symbol_first'),
            // Оставляем токены (НЕ символы) — иначе TrimStrings сломает пробел
            'thousands_sep' => (string) $this->input('thousands_sep', 'space'),
            'decimal_sep'   => (string) $this->input('decimal_sep', 'dot'),
            'activity'      => $this->boolean('activity'),
        ]);

        if (!$this->has('symbol_first')) {
            $this->merge(['symbol_first' => false]);
        }
        if (!$this->has('activity')) {
            $this->merge(['activity' => true]);
        }
    }

    public function rules(): array
    {
        // поддержка Route Model Binding и передачи id
        $currencyId = $this->route('currency')?->id ?? $this->input('id');

        return [
            'sort'          => ['nullable','integer','min:0'],
            'code'          => [
                'required','string','size:3','regex:/^[A-Z]{3}$/',
                Rule::unique('currencies', 'code')->ignore($currencyId),
            ],
            'name'          => ['required','string','max:100'],
            'symbol'        => ['nullable','string','max:8'],
            'precision'     => ['required','integer','between:0,6'],
            'symbol_first'  => ['required','boolean'],

            // ВАЖНО: валидируем ИМЕННО токены
            'thousands_sep' => ['required','string','in:space,nbsp,thinspace,comma,dot,apostrophe','different:decimal_sep'],
            'decimal_sep'   => ['required','string','in:dot,comma','different:thousands_sep'],

            'activity'      => ['required','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.regex'              => 'Код должен быть в формате ISO-4217 (три заглавные буквы).',
            'thousands_sep.in'        => 'Недопустимый разделитель тысяч.',
            'decimal_sep.in'          => 'Недопустимый десятичный разделитель.',
            'thousands_sep.different' => 'Разделитель тысяч не может совпадать с десятичным.',
            'decimal_sep.different'   => 'Десятичный разделитель не может совпадать с разделителем тысяч.',
        ];
    }

    /**
     * После УСПЕШНОЙ валидации конвертируем токены → реальные символы,
     * чтобы в модели/контроллере и БД были именно символы.
     */
    protected function passedValidation(): void
    {
        $map = [
            'space'      => ' ',
            'nbsp'       => "\u{00A0}",
            'thinspace'  => "\u{2009}",
            'comma'      => ',',
            'dot'        => '.',
            'apostrophe' => "'",
        ];

        $thToken = (string) $this->input('thousands_sep');
        $decToken = (string) $this->input('decimal_sep');

        $this->merge([
            'thousands_sep' => $map[$thToken] ?? $thToken,
            'decimal_sep'   => $map[$decToken] ?? $decToken,
        ]);
    }
}
