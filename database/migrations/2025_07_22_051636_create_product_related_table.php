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
        Schema::create('product_related', function (Blueprint $table) {
            $table->foreignId('product_id')
                ->constrained('products')
                ->cascadeOnDelete(); // основной товар

            $table->foreignId('related_product_id')
                ->constrained('products')
                ->cascadeOnDelete(); // рекомендуемый товар

            $table->unique(['product_id', 'related_product_id']); // уникальная пара
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_related');
    }
};
