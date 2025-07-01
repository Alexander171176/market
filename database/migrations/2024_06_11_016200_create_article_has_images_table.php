<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_has_images', function (Blueprint $table) {
            // Убираем id()
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('image_id')->constrained('article_images')->onDelete('cascade');
            $table->unsignedInteger('order')->default(0); // Добавляем поле order

            // Добавляем первичный ключ
            $table->primary(['article_id', 'image_id']);
            // Индекс на order для сортировки внутри статьи (опционально, но может быть полезно)
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_has_images');
    }
};
