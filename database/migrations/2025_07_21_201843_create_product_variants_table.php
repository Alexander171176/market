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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete(); // связь с товаром
            $table->unsignedInteger('sort')->default(0)->index(); // позиция сортировки
            $table->boolean('activity')->default(false)->index(); // активность товара
            $table->text('img')->nullable(); // резервное поле для переноса с других сайтов
            $table->string('sku')->nullable()->index(); // индивидуальный артикул
            $table->string('title'); // название варианта (например: "XL / красный")
            $table->string('short', 255)->nullable(); // краткое описание
            $table->text('description')->nullable(); // описание
            $table->unsignedInteger('quantity')->default(0); // количество
            $table->unsignedInteger('weight')->default(0); // вес
            $table->string('availability', 255)->nullable()->index(); // наличие
            $table->decimal('price', 10, 2)->nullable()->index(); // цена варианта
            $table->decimal('old_price', 10, 2)->nullable(); // старая цена
            $table->string('currency', 3)->default('USD')->index(); // валюта
            $table->string('barcode')->nullable()->index(); // штрих-код
            $table->json('options')->nullable(); // опции (например: {"size": "XL", "color": "red"})
            $table->string('admin', 255)->nullable(); // заметка

            $table->unique(['title', 'sku']); // уникальная пара

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
