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
        Schema::create('property_has_property_value', function (Blueprint $table) {
            $table->foreignId('property_id')
                ->constrained('properties')
                ->cascadeOnDelete();

            $table->foreignId('property_value_id')
                ->constrained('property_values')
                ->cascadeOnDelete();

            $table->unsignedInteger('sort')->default(0);

            $table->primary(['property_id', 'property_value_id']); // уникальность пары
            // $table->timestamps(); // включи, если нужны created_at/updated_at для связи
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_has_property_value');
    }

};
