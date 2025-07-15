<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_likes', function (Blueprint $table) {
            $table->id(); // Оставляем, если нужен ID самого лайка
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Указываем таблицу users явно
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->timestamps();

            // Добавляем уникальный ключ, чтобы пользователь не мог лайкнуть дважды
            $table->unique(['user_id', 'article_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_likes');
    }
};
