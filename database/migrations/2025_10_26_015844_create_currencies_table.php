<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Создание таблицы валют интернет-магазина.
     */
    public function up(): void
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();

            // Позиция сортировки (для ручного упорядочивания валют в админке)
            $table->unsignedInteger('sort')->default(0)->index();

            // --- Основные данные валюты ---
            // Код валюты по ISO 4217 (например: USD, EUR, KZT, RUB)
            $table->string('code', 3)->unique();

            // Название валюты (например: Доллар США, Евро, Тенге, Рубль)
            $table->string('name', 64);

            // Символ валюты ($, €, ₸, ₽ и т.п.)
            $table->string('symbol', 8)->nullable();

            // Количество знаков после запятой при форматировании (обычно 2)
            $table->unsignedTinyInteger('precision')->default(2);

            // Если true — символ валюты отображается перед числом (например: "$100"),
            // если false — после ("100 ₸")
            $table->boolean('symbol_first')->default(false);

            // Разделитель тысяч (например: пробел, запятая или точка)
            $table->string('thousands_sep', 2)->default(' ');

            // Разделитель десятичных знаков (обычно точка или запятая)
            $table->string('decimal_sep', 2)->default('.');

            // --- Статусы валюты ---
            // Флаг активности валюты (true = используется, false = скрыта)
            $table->boolean('activity')->default(true);

            // Флаг "основной" валюты — может быть только одна активная по умолчанию
            // Этот флаг контролируется логикой приложения, а не БД
            $table->boolean('is_default')->default(false);

            // Время, когда валюту назначили основной (для истории)
            $table->timestamp('set_default_at')->nullable();

            // --- Служебные поля ---
            $table->timestamps();

            // Индекс для ускоренного поиска по активности и флагу "основная"
            $table->index(['activity', 'is_default']);
        });
    }

    /**
     * Удаление таблицы валют.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
