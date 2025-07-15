<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable(); // Индекс будет ниже
            $table->unsignedInteger('sort')->default(0); // Индекс будет ниже
            $table->boolean('activity')->default(false)->index();
            $table->string('locale', 2); // Индекс будет ниже
            $table->string('title');
            $table->string('url', 500)->index(); // Индекс нужен для поиска по URL
            $table->string('short', 255)->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('views')->default(0)->index();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_keywords', 255)->nullable();
            $table->text('meta_desc')->nullable();
            $table->timestamps();

            // Композитные уникальные ключи (остаются важными)
            $table->unique(['locale', 'title']);
            $table->unique(['locale', 'url']);

            // --- Оптимизированные индексы ---
            // Основной индекс для выборки иерархии внутри локали
            $table->index(['locale', 'parent_id', 'sort']);
            // Индекс для корневых элементов локали (покрывается предыдущим, но может быть полезен отдельно)
            // $table->index(['locale', 'parent_id']); // Обычно не нужен, если есть ['locale', 'parent_id', 'sort']
            // Индекс для сортировки (на всякий случай, если будут запросы без locale/parent_id)
            $table->index('sort');

            // Foreign key (остается без изменений на уровне DB, проверка locale - на уровне приложения)
            $table->foreign('parent_id')
                ->references('id')
                ->on('categories')
                ->nullOnDelete(); // Или cascadeOnDelete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
