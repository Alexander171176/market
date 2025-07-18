<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->default(0)->index(); // unsigned + index
            $table->string('alt')->nullable();
            $table->string('caption')->nullable();
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('video_images');
    }
};
