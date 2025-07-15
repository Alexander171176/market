<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsigned + index
            $table->boolean('activity')->default(false)->index(); // index
            $table->string('locale', 2)->index(); // index
            $table->string('name'); // Убираем unique
            $table->string('slug')->index(); // Убираем unique, добавляем index
            $table->string('short', 255)->nullable(); // string
            $table->text('description')->nullable();
            $table->unsignedBigInteger('views')->default(0)->index(); // index
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_keywords', 255)->nullable();
            $table->text('meta_desc')->nullable(); // text
            $table->timestamps();

            // Композитные уникальные ключи
            $table->unique(['locale', 'name']);
            $table->unique(['locale', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
