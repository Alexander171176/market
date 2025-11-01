<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;

class BulkCurrencyRatesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        // извлекаем base из route model binding
        $routeCurrency = $this->route('currency');
        $baseId = is_object($routeCurrency)
            ? (int) data_get($routeCurrency, 'id', 0)
            : (int) ($routeCurrency ?? 0);

        $inputRates = $this->input('rates', []);
        $normalized = [];

        if (is_array($inputRates)) {
            foreach ($inputRates as $item) {
                // number: поддержка запятой
                $raw = (string) ($item['rate'] ?? '');
                $num = str_replace(',', '.', $raw);
                $rate = is_numeric($num) ? $num + 0 : null;

                // provider
                $provider = $item['provider'] ?? null;
                $provider = is_string($provider) && trim($provider) !== '' ? trim($provider) : null;

                // bool
                $isManual = filter_var($item['is_manual'] ?? true, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                if ($isManual === null) $isManual = true;

                $normalized[] = [
                    'base_currency_id'  => $baseId, // 👈 ВСЕГДА из маршрута
                    'quote_currency_id' => (int) ($item['quote_currency_id'] ?? 0),
                    'rate'              => $rate,
                    'provider'          => $provider, // может быть null
                    'is_manual'         => $isManual,
                    // fetched_at не валидируем — контроллер сам проставит now()
                ];
            }
        }

        $this->merge(['rates' => $normalized]);
    }

    public function rules(): array
    {
        return [
            'rates'                         => ['required','array','min:1'],

            'rates.*.base_currency_id'      => ['required','integer','exists:currencies,id'],
            'rates.*.quote_currency_id'     => ['required','integer','exists:currencies,id','different:base_currency_id'],

            // до 18 знаков — как в одиночном запросе
            'rates.*.rate'                  => ['required','numeric','gt:0','decimal:0,18'],

            // убрали Rule::in — допускаем любой провайдер/или null
            'rates.*.provider'              => ['nullable','string','max:50'],
            'rates.*.is_manual'             => ['required','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            // Сам массив
            'rates.required' => 'Не передан массив курсов.',
            'rates.array'    => 'Поле «курсы» должно быть массивом.',
            'rates.min'      => 'Нужно передать хотя бы один курс.',

            // base_currency_id
            'rates.*.base_currency_id.required' => 'Не указана базовая валюта.',
            'rates.*.base_currency_id.integer'  => 'Идентификатор базовой валюты должен быть целым числом.',
            'rates.*.base_currency_id.exists'   => 'Указанная базовая валюта не найдена.',

            // quote_currency_id
            'rates.*.quote_currency_id.required'  => 'Не указана котируемая валюта.',
            'rates.*.quote_currency_id.integer'   => 'Идентификатор котируемой валюты должен быть целым числом.',
            'rates.*.quote_currency_id.exists'    => 'Указанная котируемая валюта не найдена.',
            'rates.*.quote_currency_id.different' => 'Базовая и котируемая валюты должны отличаться.',

            // rate
            'rates.*.rate.required' => 'Укажите курс.',
            'rates.*.rate.numeric'  => 'Курс должен быть числом (можно использовать запятую или точку).',
            'rates.*.rate.gt'       => 'Курс должен быть больше нуля.',
            'rates.*.rate.decimal'  => 'Слишком много знаков после запятой у курса (макс. 18).',

            // provider
            'rates.*.provider.string' => 'Провайдер должен быть строкой.',
            'rates.*.provider.max'    => 'Провайдер не должен превышать :max символов.',

            // is_manual
            'rates.*.is_manual.required' => 'Признак ручного ввода обязателен.',
            'rates.*.is_manual.boolean'  => 'Поле ручного ввода должно быть булевым значением.',
        ];
    }

    public function attributes(): array
    {
        return [
            'rates'                        => 'курсы',
            'rates.*.base_currency_id'     => 'базовая валюта',
            'rates.*.quote_currency_id'    => 'котируемая валюта',
            'rates.*.rate'                 => 'курс',
            'rates.*.provider'             => 'провайдер',
            'rates.*.is_manual'            => 'ручной ввод',
        ];
    }

}
