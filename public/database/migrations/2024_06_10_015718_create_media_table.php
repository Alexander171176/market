<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id(); // Идентификатор медиафайла

            $table->morphs('model'); // Полиморфная связь с моделью (например, ArticleImage)
            $table->uuid()->nullable()->unique(); // Уникальный идентификатор (UUID)
            $table->string('collection_name'); // Имя коллекции (например, images)
            $table->string('name'); // Исходное название файла
            $table->string('file_name'); // Фактическое имя файла на диске
            $table->string('mime_type')->nullable(); // MIME-тип файла (например, image/jpeg)
            $table->string('disk'); // Диск (например, public)
            $table->string('conversions_disk')->nullable(); // Диск для хранения конверсий (может совпадать с disk)
            $table->unsignedBigInteger('size'); // Размер файла в байтах
            $table->json('manipulations'); // JSON-параметры манипуляций изображений (например, resize, crop)
            $table->json('custom_properties'); // Произвольные дополнительные свойства файла
            $table->json('generated_conversions'); // JSON-данные о созданных конверсиях (например, webp)
            $table->json('responsive_images'); // JSON-данные для адаптивных изображений
            $table->unsignedInteger('order_column')->nullable()->index(); // Порядок сортировки

            $table->nullableTimestamps(); // Даты создания и изменения файла
        });
    }

    // 👇 Добавьте этот метод
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
