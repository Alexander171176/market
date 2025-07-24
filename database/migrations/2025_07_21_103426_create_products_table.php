<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // позиция сортировки
            $table->boolean('activity')->default(false)->index(); // активность товара
            $table->boolean('left')->default(false)->index(); // показывать в левой колонке
            $table->boolean('main')->default(false)->index(); // показывать в главном
            $table->boolean('right')->default(false)->index(); // показывать в правой колонке
            $table->boolean('is_new')->default(false)->index(); // в новинках
            $table->boolean('is_hit')->default(false)->index(); // в рекомендованных
            $table->boolean('is_sale')->default(false)->index(); // в распродаже
            $table->text('img')->nullable(); // резервное поле для переноса с других сайтов
            $table->string('locale', 2)->index(); // локализация
            $table->string('sku')->nullable()->unique(); // индивидуальный артикул
            $table->string('title'); // название
            $table->string('url', 500)->index(); // url
            $table->string('short', 255)->nullable(); // краткое описание
            $table->text('description')->nullable(); // описание
            $table->unsignedBigInteger('views')->default(0)->index(); // просмотры
            $table->unsignedInteger('quantity')->default(0); // количество
            $table->string('unit', 30)->nullable(); // единица количества
            $table->unsignedInteger('weight')->default(0); // вес
            $table->string('availability', 255)->nullable()->index(); // наличие
            $table->decimal('price', 10, 2)->default(0)->index(); // стоимость
            $table->decimal('old_price', 10, 2)->default(0)->index(); // старая цена
            $table->string('currency', 3)->default('USD')->index(); // валюта
            $table->string('barcode')->nullable()->index(); // штрих-код
            $table->string('meta_title', 255)->nullable(); // мета заголовок
            $table->string('meta_keywords', 255)->nullable(); // мета ключи
            $table->text('meta_desc')->nullable(); // мета описание
            $table->string('admin', 255)->nullable(); // заметка
            $table->timestamps();

            // Композитные уникальные ключи
            $table->unique(['locale', 'title']);
            $table->unique(['locale', 'url']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
