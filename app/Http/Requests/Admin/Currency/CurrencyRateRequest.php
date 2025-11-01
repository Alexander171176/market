<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class CurrencyRateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        // currency из route model binding (объект) или id
        $routeCurrency   = $this->route('currency');
        $routeCurrencyId = is_object($routeCurrency)
            ? (int) data_get($routeCurrency, 'id', 0)
            : (int) ($routeCurrency ?? 0);

        // Нормализация числа: поддержка запятой, мусор -> null
        $rawRate    = (string) $this->input('rate', '');
        $normalized = str_replace(',', '.', $rawRate);
        $rate       = is_numeric($normalized) ? $normalized + 0 : null;

        // Булево
        $isManual = filter_var($this->input('is_manual', true), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($isManual === null) {
            $isManual = true;
        }

        // Нормализация fetched_at (приходит ISO или любая строка даты/времени)
        $rawFetchedAt = $this->input('fetched_at');
        $fetchedAt    = null;
        if ($rawFetchedAt !== null && $rawFetchedAt !== '') {
            try {
                $parsed    = Carbon::parse((string) $rawFetchedAt);
                // Храним в БД как 'Y-m-d H:i:s'
                $fetchedAt = $parsed->toDateTimeString();
            } catch (\Throwable $e) {
                // если не распарсилось — оставляем null, валидация ниже отфильтрует
                $fetchedAt = null;
            }
        }

        $this->merge([
            'base_currency_id'  => (int) $this->input('base_currency_id', $routeCurrencyId),
            'quote_currency_id' => (int) $this->input('quote_currency_id'),
            'rate'              => $rate,
            'provider'          => trim((string) $this->input('provider', 'manual')),
            'is_manual'         => $isManual,
            'fetched_at'        => $fetchedAt,
        ]);
    }

    public function rules(): array
    {
        return [
            'base_currency_id'  => ['bail','required','integer','exists:currencies,id'],
            'quote_currency_id' => ['bail','required','integer','different:base_currency_id','exists:currencies,id'],
            // разрешаем до 18 знаков после запятой
            'rate'              => ['bail','required','numeric','gt:0','decimal:0,18'],
            // БЕЗ Rule::in — любой провайдер
            'provider'          => ['nullable','string','max:50'],
            'is_manual'         => ['required','boolean'],
            'fetched_at'        => ['nullable','date'], // или 'date_format:Y-m-d H:i:s' если хочешь строго
        ];
    }

    public function messages(): array
    {
        return [
            'base_currency_id.required'   => 'Не указана базовая валюта.',
            'base_currency_id.integer'    => 'Идентификатор базовой валюты должен быть целым числом.',
            'base_currency_id.exists'     => 'Указанная базовая валюта не найдена.',

            'quote_currency_id.required'  => 'Не указана котируемая валюта.',
            'quote_currency_id.integer'   => 'Идентификатор котируемой валюты должен быть целым числом.',
            'quote_currency_id.exists'    => 'Указанная котируемая валюта не найдена.',
            'quote_currency_id.different' => 'Базовая и котируемая валюты должны отличаться.',

            'rate.required'               => 'Укажите курс.',
            'rate.numeric'                => 'Курс должен быть числом (можно использовать запятую или точку).',
            'rate.gt'                     => 'Курс должен быть больше нуля.',
            'rate.decimal'                => 'Слишком много знаков после запятой у курса.',

            'provider.string'             => 'Провайдер должен быть строкой.',
            'provider.max'                => 'Провайдер не должен превышать :max символов.',

            'is_manual.required'          => 'Признак ручного ввода обязателен.',
            'is_manual.boolean'           => 'Поле ручного ввода должно быть булевым значением.',

            'fetched_at.date'             => 'Неверный формат даты «Дата получения курса».',
        ];
    }

    public function attributes(): array
    {
        return [
            'base_currency_id'  => 'базовая валюта',
            'quote_currency_id' => 'котируемая валюта',
            'rate'              => 'курс',
            'provider'          => 'провайдер',
            'is_manual'         => 'ручной ввод',
            'fetched_at'        => 'дата получения курса',
        ];
    }
}
