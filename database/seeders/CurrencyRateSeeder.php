<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencyRateSeeder extends Seeder
{
    public function run(): void
    {
        // Определяем ID валют
        $map = DB::table('currencies')->pluck('id', 'code');

        $rates = [
            // базовая валюта USD
            ['base' => 'USD', 'quote' => 'EUR', 'rate' => 0.92],
            ['base' => 'USD', 'quote' => 'KZT', 'rate' => 485.00],
            ['base' => 'USD', 'quote' => 'RUB', 'rate' => 93.00],

            // обратные пары (EUR -> USD и т.д.)
            ['base' => 'EUR', 'quote' => 'USD', 'rate' => 1.09],
            ['base' => 'KZT', 'quote' => 'USD', 'rate' => 0.00206],
            ['base' => 'RUB', 'quote' => 'USD', 'rate' => 0.0107],
        ];

        foreach ($rates as $r) {
            if (!isset($map[$r['base']], $map[$r['quote']])) {
                continue;
            }

            DB::table('currency_rates')->updateOrInsert(
                [
                    'base_currency_id' => $map[$r['base']],
                    'quote_currency_id' => $map[$r['quote']],
                ],
                [
                    'rate' => $r['rate'],
                    'provider' => 'manual',
                    'is_manual' => true,
                    'fetched_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
