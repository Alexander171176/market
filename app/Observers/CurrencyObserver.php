<?php

namespace App\Observers;


use App\Models\Admin\Currency\Currency;
use Illuminate\Support\Facades\DB;

class CurrencyObserver
{
    public function saving(Currency $currency): void
    {
        // Никаких действий, если не меняем is_default на true
        if (!$currency->is_default) return;

        // Если эта валюта становится основной — снимаем флаг со всех остальных
        DB::transaction(function () use ($currency) {
            Currency::where('id', '<>', $currency->id)->update(['is_default' => false]);
            if (!$currency->set_default_at) {
                $currency->set_default_at = now();
            }
        });
    }
}
