<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            // Связь с пользователем (оставляем как есть)
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Сделаем nullable, если гость может комментировать или если пользователя могут удалить

            // Полиморфная связь: commentable
            // Создает колонки commentable_id (BIGINT UNSIGNED) и commentable_type (VARCHAR)
            $table->morphs('commentable');

            // Связь с родительским комментарием (для древовидной структуры)
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade');

            // Содержимое комментария
            $table->text('content');

            // Статус (одобрен/не одобрен) и Активность
            $table->boolean('approved')->default(false)->index(); // Переименовано для ясности (вместо status)
            $table->boolean('activity')->default(true)->index();

            $table->timestamps();

            // Добавляем индексы
            // Индекс на полиморфную связь ускорит поиск комментариев к конкретной модели
            $table->index(['commentable_id', 'commentable_type']); // morphs() уже создает этот индекс
            $table->index('parent_id');
            $table->index(['user_id']); // foreignId() часто создает индекс, но можно добавить явно
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
