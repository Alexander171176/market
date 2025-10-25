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
        Schema::create('product_has_property', function (Blueprint $table) {
            // Пивот без собственного id
            $table->foreignId('product_id')
                ->constrained()               // ->references('id')->on('products')
                ->cascadeOnDelete();

            $table->foreignId('property_id')
                ->constrained()               // ->references('id')->on('properties')
                ->cascadeOnDelete();

            // Необязательное поле — если хочешь управлять порядком свойств у товара
            $table->unsignedInteger('sort')->default(0);

            // Таймстемпы пивота — удобно для аудита/фильтрации
            $table->timestamps();

            // Защита от дублей
            $table->unique(['product_id', 'property_id'], 'php_unique');

            // Вспомогательные индексы (ускоряют выборки по одному из FK)
            $table->index('product_id', 'php_product_idx');
            $table->index('property_id', 'php_property_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_has_property');
    }
};
