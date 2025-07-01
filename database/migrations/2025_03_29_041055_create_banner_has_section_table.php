<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('banner_has_section', function (Blueprint $table) {
            // Короткий синтаксис ключей
            $table->foreignId('banner_id')->constrained('banners')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');

            // Добавляем первичный ключ
            $table->primary(['banner_id', 'section_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('banner_has_section');
    }
};
