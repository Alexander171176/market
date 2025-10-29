<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Создание таблицы курсов валют (currency_rates).
     *
     * Таблица хранит курсы обмена между валютами:
     * каждая запись отражает, сколько стоит 1 единица базовой валюты (base)
     * в другой валюте (quote).
     *
     * Пример:
     *   base = USD
     *   quote = EUR
     *   rate = 0.92
     *   => 1 USD = 0.92 EUR
     */
    public function up(): void
    {
        Schema::create('currency_rates', function (Blueprint $table) {
            $table->id();

            // --- Взаимосвязанные валюты ---
            // Базовая валюта (например, USD)
            $table->foreignId('base_currency_id')
                ->constrained('currencies')
                ->cascadeOnDelete();

            // Котируемая валюта (например, EUR)
            $table->foreignId('quote_currency_id')
                ->constrained('currencies')
                ->cascadeOnDelete();

            // --- Основные данные курса ---
            // Курс обмена: сколько единиц "quote" дают за 1 "base"
            // Пример: 1 USD = 0.92 EUR => rate = 0.92
            $table->decimal('rate', 20, 8);

            // --- Метаданные источника ---
            // Источник данных курса:
            // 'ecb' — Европейский центральный банк
            // 'nbu' — Национальный банк Украины
            // 'manual' — ручное добавление администратором
            $table->string('provider', 64)->nullable();

            // Признак, что курс введён вручную
            $table->boolean('is_manual')->default(false);

            // --- Время актуальности ---
            // Когда курс был получен или установлен
            $table->timestamp('fetched_at')->nullable();

            // --- Технические поля ---
            $table->timestamps();

            // --- Индексы и уникальные ограничения ---
            // Уникальная комбинация: пара валют + дата
            // (нельзя создать два курса для одной пары на одно и то же время)
            $table->unique(
                ['base_currency_id', 'quote_currency_id', 'fetched_at'],
                'currency_rates_pair_at_unique'
            );

            // Индекс для ускоренного поиска по паре валют
            $table->index(
                ['base_currency_id', 'quote_currency_id'],
                'currency_rates_pair_idx'
            );
        });
    }

    /**
     * Удаление таблицы курсов валют.
     */
    public function down(): void
    {
        Schema::dropIfExists('currency_rates');
    }
};
