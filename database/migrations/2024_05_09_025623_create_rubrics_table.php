<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rubrics', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // Используем unsignedInteger и добавляем индекс
            $table->boolean('activity')->default(false)->index(); // Добавляем индекс
            $table->text('icon')->nullable();
            $table->string('locale', 2)->index(); // Добавляем индекс
            $table->string('title'); // Убираем unique() отсюда
            $table->string('url')->index(); // Убираем unique() отсюда, добавляем индекс
            $table->string('short', 255)->nullable(); // Используем string для краткого описания
            $table->text('description')->nullable();
            $table->unsignedBigInteger('views')->default(0)->index(); // Добавляем индекс
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_keywords', 255)->nullable();
            $table->text('meta_desc')->nullable(); // Meta description может быть длиннее 255
            $table->timestamps();

            // Композитный уникальный ключ для title в рамках языка
            $table->unique(['locale', 'title']);
            // Композитный уникальный ключ для url в рамках языка
            $table->unique(['locale', 'url']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rubrics');
    }
};
