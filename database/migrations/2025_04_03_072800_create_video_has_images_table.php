<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_has_images', function (Blueprint $table) {
            // Убираем id()
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->foreignId('image_id')->constrained('video_images')->onDelete('cascade');
            $table->unsignedInteger('order')->default(0); // Добавляем поле order

            // Добавляем первичный ключ
            $table->primary(['video_id', 'image_id']);
            // Индекс на order (опционально)
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_has_images');
    }
};
