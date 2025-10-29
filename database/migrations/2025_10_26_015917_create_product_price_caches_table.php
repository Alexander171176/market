<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Создание таблицы product_price_caches.
     *
     * Таблица хранит кэшированные цены товаров в разных валютах.
     * Это позволяет быстро показывать пользователю цену в нужной валюте
     * без пересчёта "на лету" при каждом запросе.
     */
    public function up(): void
    {
        Schema::create('product_price_caches', function (Blueprint $table) {
            $table->id();

            // --- Связи ---
            // Какому товару принадлежит цена
            $table->foreignId('product_id')
                ->constrained('products')
                ->cascadeOnDelete();

            // В какой валюте указана цена (например: USD, KZT, EUR)
            $table->foreignId('currency_id')
                ->constrained('currencies')
                ->cascadeOnDelete();

            // --- Основные данные ---
            // Пересчитанная цена товара в указанной валюте
            $table->decimal('price', 20, 8);

            // Старая цена (если была скидка, акция и т.п.)
            $table->decimal('old_price', 20, 8)->nullable();

            // --- Метаданные ---
            // Когда была произведена конвертация (используется для контроля актуальности)
            $table->timestamp('calculated_at')->nullable();

            // Из какого источника или курса была рассчитана цена
            // (например: 'fixer.io', 'nbk', 'manual', 'cache')
            $table->string('rate_provider', 64)->nullable();

            // --- Технические поля ---
            $table->timestamps();

            // Уникальность пары "товар + валюта"
            // Нельзя хранить две записи для одного товара в одной валюте
            $table->unique(['product_id', 'currency_id'], 'product_currency_unique');
        });
    }

    /**
     * Удаление таблицы product_price_caches.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_price_caches');
    }
};
