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
        Schema::create('product_has_images', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('image_id')->constrained('product_images')->onDelete('cascade');
            $table->unsignedInteger('order')->default(0); // Добавляем поле order

            // Добавляем первичный ключ
            $table->primary(['product_id', 'image_id']);
            // Индекс на order для сортировки внутри статьи (опционально, но может быть полезно)
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_has_images');
    }
};
