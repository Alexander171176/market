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
            $table->foreignId('property_id')->constrained('properties')->cascadeOnDelete();
            $table->unsignedInteger('sort')->default(0)->index();
            $table->boolean('activity')->default(true)->index();

            $table->string('locale', 2)->index();
            $table->string('name', 255);           // например: «Чёрный», «Дерево»
            $table->string('slug', 255)->index(); // системный ключ (опционально)
            $table->timestamps();

            // имя и slug уникальны в рамках характеристики + локали
            $table->unique(['property_id', 'locale', 'name']);
            $table->unique(['property_id', 'locale', 'slug']);
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
