<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultCurrenciesSeeder extends Seeder
{
    public function run(): void
    {
        // сначала вызываем основные сидеры
        $this->call([
            CurrencySeeder::class,
            CurrencyRateSeeder::class,
        ]);

        // убеждаемся, что только одна валюта установлена как основная
        $default = DB::table('currencies')->where('is_default', true)->first();
        if (!$default) {
            DB::table('currencies')->where('code', 'USD')->update([
                'is_default' => true,
                'set_default_at' => now(),
            ]);
        }

        DB::table('currencies')->where('code', '<>', 'USD')->update([
            'is_default' => false,
        ]);
    }
}
