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
        Schema::create('property_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete(); // связь с характеристикой
            $table->unsignedInteger('sort')->default(0)->index(); // порядок
            $table->string('value'); // значение, например: Чёрный, Дерево
            $table->string('slug')->nullable()->index()->comment('Опциональный системный ключ значения');
            $table->timestamps();

            $table->unique(['property_id', 'value']); // уникальность значений в рамках характеристики
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_values');
    }
};
