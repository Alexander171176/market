<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rubric_has_sections', function (Blueprint $table) {

            // Внешние ключи (можно использовать более короткий синтаксис)
            $table->foreignId('rubric_id')->constrained('rubrics')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');

            // Заменяем unique на primary для стандартной pivot таблицы
            $table->primary(['rubric_id', 'section_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rubric_has_sections');
    }
};
