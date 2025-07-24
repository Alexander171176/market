<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variant_has_images', function (Blueprint $table) {
            $table->foreignId('product_variant_id')
                ->constrained('product_variants')
                ->onDelete('cascade');

            $table->foreignId('image_id')
                ->constrained('product_variant_images')
                ->onDelete('cascade');

            $table->unsignedInteger('order')->default(0);

            $table->primary(['product_variant_id', 'image_id']);
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variant_has_images');
    }
};
