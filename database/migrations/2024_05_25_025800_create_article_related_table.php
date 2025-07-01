<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_related', function (Blueprint $table) {
            // Используем foreignId для краткости
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('related_article_id')->constrained('articles')->onDelete('cascade'); // Указываем ту же таблицу 'articles'

            $table->primary(['article_id', 'related_article_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_related');
    }
};
