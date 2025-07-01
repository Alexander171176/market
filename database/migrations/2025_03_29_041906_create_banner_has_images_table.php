<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('banner_has_images', function (Blueprint $table) {
            $table->foreignId('banner_id')->constrained('banners')->onDelete('cascade');
            $table->foreignId('image_id')->constrained('banner_images')->onDelete('cascade');
            $table->unsignedInteger('order')->default(0); // Добавляем поле order

            // Добавляем первичный ключ
            $table->primary(['banner_id', 'image_id']);
            // Индекс на order (опционально)
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('banner_has_images');
    }
};
