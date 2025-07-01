<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsigned + index
            $table->boolean('activity')->default(false)->index(); // index
            $table->boolean('left')->default(false)->index(); // index
            $table->boolean('main')->default(false)->index(); // index
            $table->boolean('right')->default(false)->index(); // index
            $table->string('locale', 2)->index(); // index
            $table->string('title'); // Убираем unique
            $table->string('url', 500)->index(); // Меняем text на string(500), убираем unique, добавляем index
            $table->string('short', 255)->nullable(); // string(255)
            $table->text('description')->nullable();
            $table->string('author')->nullable();
            $table->date('published_at')->nullable()->index(); // РЕКОМЕНДАЦИЯ: Добавить дату публикации, если нужна + index
            $table->unsignedBigInteger('views')->default(0)->index(); // index
            $table->unsignedBigInteger('likes')->default(0)->index(); // index (если нужно сортировать/фильтровать по лайкам)
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_keywords', 255)->nullable();
            $table->text('meta_desc')->nullable(); // text
            $table->timestamps();

            // Композитные уникальные ключи
            $table->unique(['locale', 'title']);
            $table->unique(['locale', 'url']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
