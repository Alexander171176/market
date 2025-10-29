<?php

// database/migrations/2025_01_01_000200_update_products_add_currency_fk.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // новый FK
            $table->foreignId('currency_id')->nullable()->after('price')->constrained('currencies')->nullOnDelete();
        });

        // гарантируем базовые валюты (минимальный набор)
        $defaults = [
            ['code' => 'USD', 'name' => 'US Dollar', 'symbol' => '$'],
            ['code' => 'EUR', 'name' => 'Euro', 'symbol' => '€'],
            ['code' => 'KZT', 'name' => 'Kazakhstani Tenge', 'symbol' => '₸', 'precision' => 2],
            ['code' => 'RUB', 'name' => 'Russian Ruble', 'symbol' => '₽'],
        ];

        foreach ($defaults as $d) {
            DB::table('currencies')->updateOrInsert(
                ['code' => $d['code']],
                [
                    'name'         => $d['name'],
                    'symbol'       => $d['symbol'] ?? null,
                    'precision'    => $d['precision'] ?? 2,
                    'symbol_first' => true,
                    'is_active'    => true,
                    'updated_at'   => now(),
                    'created_at'   => DB::raw('COALESCE(created_at, NOW())'),
                ]
            );
        }

        // сопоставим products.currency -> currencies.id
        $map = DB::table('currencies')->pluck('id', 'code'); // ['USD' => 1, ...]
        $products = DB::table('products')->select('id', 'currency')->get();

        foreach ($products as $p) {
            if (!$p->currency) continue;
            $code = strtoupper(trim($p->currency));
            if (isset($map[$code])) {
                DB::table('products')->where('id', $p->id)->update(['currency_id' => $map[$code]]);
            }
        }

        // Индекс для частых выборок
        Schema::table('products', function (Blueprint $table) {
            $table->index('currency_id');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('currency_id');
            $table->dropIndex(['currency_id']);
        });
    }
};
