<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_has_video', function (Blueprint $table) {
            // Используем foreignId для краткости
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');

            $table->primary(['video_id', 'article_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_has_video');
    }
};
