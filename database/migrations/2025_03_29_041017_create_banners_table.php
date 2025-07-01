<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort')->default(0)->index(); // unsigned + index
            $table->boolean('activity')->default(false)->index(); // index
            $table->boolean('left')->default(false)->index(); // index
            $table->boolean('right')->default(false)->index(); // index
            $table->string('title'); // unique убран, если они не мультиязычные
            $table->text('link')->nullable(); // text для длинных URL
            $table->string('short', 255)->nullable(); // string
            $table->string('comment', 255)->nullable(); // string
            $table->timestamps();

            // Если баннеры УНИКАЛЬНЫ по названию (независимо от языка), добавьте:
            // $table->unique('title');
            // Если баннеры мультиязычные, добавьте locale и композитный ключ, как в статьях.
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
