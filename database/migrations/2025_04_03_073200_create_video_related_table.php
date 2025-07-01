<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_related', function (Blueprint $table) {
            // Используем foreignId для краткости
            $table->foreignId('video_id')->constrained('videos')->onDelete('cascade');
            $table->foreignId('related_video_id')->constrained('videos')->onDelete('cascade'); // Указываем ту же таблицу 'videos'

            // Составной первичный ключ (уже был правильный)
            $table->primary(['video_id', 'related_video_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_related');
    }
};
