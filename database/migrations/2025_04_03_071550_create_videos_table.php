<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsigned + index
            $table->boolean('activity')->default(false)->index(); // index

            $table->boolean('left')->default(false)->index(); // index
            $table->boolean('main')->default(false)->index(); // index
            $table->boolean('right')->default(false)->index(); // index

            $table->string('locale', 2)->index(); // index

            $table->string('title'); // Убираем unique
            $table->string('url', 500)->index(); // Меняем text на string, убираем unique, добавляем index
            $table->string('short', 255)->nullable(); // string
            $table->text('description')->nullable();
            $table->string('author')->nullable();
            $table->date('published_at')->nullable()->index(); // index
            $table->unsignedInteger('duration')->nullable()->comment('Длительность видео в секундах'); // unsigned

            $table->enum('source_type', ['local', 'youtube', 'vimeo', 'code'])->default('local')->index(); // index

            $table->text('embed_code')->nullable(); // Поле для 'code'
            $table->string('external_video_id')->nullable(); // Для youtube/vimeo ID или для code (iframe)

            $table->unsignedBigInteger('views')->default(0)->index(); // index
            $table->unsignedBigInteger('likes')->default(0)->index(); // index

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
        Schema::dropIfExists('videos');
    }
};
