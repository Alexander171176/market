<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    public function run(): void
    {
        $currencies = [
            [
                'sort' => 1,
                'code' => 'USD',
                'name' => 'US Dollar',
                'symbol' => '$',
                'precision' => 2,
                'symbol_first' => true,
                'thousands_sep' => ' ',
                'decimal_sep' => '.',
                'activity' => true,
                'is_default' => true, // основная валюта
                'set_default_at' => now(),
            ],
            [
                'sort' => 2,
                'code' => 'EUR',
                'name' => 'Euro',
                'symbol' => '€',
                'precision' => 2,
                'symbol_first' => true,
                'thousands_sep' => ' ',
                'decimal_sep' => ',',
                'activity' => true,
                'is_default' => false,
            ],
            [
                'sort' => 3,
                'code' => 'KZT',
                'name' => 'Kazakhstani Tenge',
                'symbol' => '₸',
                'precision' => 2,
                'symbol_first' => false,
                'thousands_sep' => ' ',
                'decimal_sep' => '.',
                'activity' => true,
                'is_default' => false,
            ],
            [
                'sort' => 4,
                'code' => 'RUB',
                'name' => 'Russian Ruble',
                'symbol' => '₽',
                'precision' => 2,
                'symbol_first' => false,
                'thousands_sep' => ' ',
                'decimal_sep' => ',',
                'activity' => true,
                'is_default' => false,
            ],
        ];

        foreach ($currencies as $data) {
            DB::table('currencies')->updateOrInsert(
                ['code' => $data['code']],
                array_merge($data, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }
    }
}
