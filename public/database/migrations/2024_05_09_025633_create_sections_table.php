<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsignedInteger + index
            $table->boolean('activity')->default(false)->index(); // index
            $table->text('icon')->nullable();
            $table->string('locale', 2)->index(); // index
            $table->string('title'); // Убираем unique()
            // $table->string('url')->index(); // РЕКОМЕНДАЦИЯ: Добавить поле URL/Slug, как в рубриках
            $table->string('short', 255)->nullable(); // string(255)
            $table->text('description')->nullable();
            $table->timestamps();

            // Композитный уникальный ключ для title в рамках языка
            $table->unique(['locale', 'title']);
            // $table->unique(['locale', 'url']); // Если добавите поле URL
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
