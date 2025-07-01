<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_has_tag', function (Blueprint $table) {
            // Короткий синтаксис ключей
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('tag_id')->constrained('tags')->onDelete('cascade');

            // Заменяем unique на primary
            $table->primary(['article_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_has_tag');
    }
};
