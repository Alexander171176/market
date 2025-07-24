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
        Schema::create('product_likes', function (Blueprint $table) {
            $table->id(); // Оставляем, если нужен ID самого лайка
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Указываем таблицу users явно
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();

            // Добавляем уникальный ключ, чтобы пользователь не мог лайкнуть дважды
            $table->unique(['user_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_likes');
    }
};
