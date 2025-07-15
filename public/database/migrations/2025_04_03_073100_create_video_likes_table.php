<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_likes', function (Blueprint $table) {
            $table->id(); // Оставляем
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Указываем таблицу users
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->timestamps();

            // Добавляем уникальный ключ
            $table->unique(['user_id', 'video_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_likes');
    }
};
