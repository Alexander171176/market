<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plugins', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsigned + index
            $table->text('icon')->nullable();
            $table->string('name')->unique(); // Уникальность здесь ОК
            $table->string('version')->nullable();
            $table->string('code')->nullable()->index(); // Добавляем индекс, если часто ищем по коду
            $table->json('options')->nullable(); // Используем JSON для опций
            $table->text('description')->nullable();
            $table->text('readme')->nullable();
            $table->string('templates')->nullable();
            $table->boolean('activity')->default(false)->index(); // index
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plugins');
    }
};
