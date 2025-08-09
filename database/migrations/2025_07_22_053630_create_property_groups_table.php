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
        Schema::create('property_groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index();
            $table->boolean('activity')->default(true)->index();
            $table->string('locale', 2)->index();
            $table->string('name', 255);
            $table->timestamps();

            // имя группы уникально в рамках локали
            $table->unique(['locale', 'name']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_groups');
    }
};
