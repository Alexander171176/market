<?php

namespace App\Http\Requests\Admin\Currency;

use Illuminate\Foundation\Http\FormRequest;

class DefaultCurrencyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    // Поля не требуются: ID берём из {currency} в роуте
    public function rules(): array
    {
        return [];
    }
}
