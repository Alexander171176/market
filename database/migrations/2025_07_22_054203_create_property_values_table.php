<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index();
            $table->boolean('activity')->default(true)->index();

            $table->string('locale', 2)->index();
            $table->string('name', 255);                 // «Чёрный», «Дерево»
            $table->string('slug', 255)->nullable()->index(); // системный ключ (опционально)
            $table->timestamps();

            // Уникальность в рамках ЛОКАЛИ (значения независимы от характеристик)
            $table->unique(['locale', 'name']);
            $table->unique(['locale', 'slug']); // несколько NULL допустимы в MySQL — ок
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_values');
    }
};
