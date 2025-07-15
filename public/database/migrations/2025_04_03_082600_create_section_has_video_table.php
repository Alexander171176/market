<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('section_has_video', function (Blueprint $table) {
            // Используем foreignId для краткости
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');

            // Составной первичный ключ (уже был правильный)
            $table->primary(['video_id', 'section_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('section_has_video');
    }
};
