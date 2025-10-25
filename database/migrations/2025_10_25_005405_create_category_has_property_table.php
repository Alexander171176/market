<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Пивот: связи категорий и характеристик
     */
    public function up(): void
    {
        Schema::create('category_has_property', function (Blueprint $table) {
            // Внешние ключи
            $table->foreignId('category_id')
                ->constrained('categories')
                ->cascadeOnDelete();

            $table->foreignId('property_id')
                ->constrained('properties')
                ->cascadeOnDelete();

            // Композитный первичный ключ (исключает дубликаты пар)
            $table->primary(['category_id', 'property_id']);

            // Комментарий к таблице (MySQL)
            $table->comment('Пивот-таблица: категории ↔ характеристики');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_has_property');
    }
};
