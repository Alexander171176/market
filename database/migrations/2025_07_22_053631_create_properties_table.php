<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('property_group_id')->nullable()->index();
            $table->unsignedInteger('sort')->default(0)->index();
            $table->boolean('activity')->default(true)->index();

            $table->string('locale', 2)->index();
            $table->string('type', 50)->default('text');

            $table->string('name', 255);
            $table->string('slug', 255)->index(); // если нужен строгий запрет дублей — сделай NOT NULL

            $table->string('description', 255)->nullable();
            $table->boolean('is_filterable')->default(true)->index();
            $table->string('filter_type', 50)->default('checkbox')->index();

            $table->timestamps();

            $table->foreign('property_group_id')->references('id')->on('property_groups')->nullOnDelete();

            // имя и slug уникальны в рамках локали
            $table->unique(['locale', 'name']);
            $table->unique(['locale', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
