<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_has_section', function (Blueprint $table) {

            // Внешние ключи коротким синтаксисом
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');

            // Добавляем первичный ключ
            $table->primary(['article_id', 'section_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_has_section');
    }
};
