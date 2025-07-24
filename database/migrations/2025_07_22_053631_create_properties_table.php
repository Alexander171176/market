<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('property_group_id')
                ->nullable()
                ->comment('Группа характеристики');

            $table->unsignedInteger('sort')
                ->default(0)
                ->index()
                ->comment('Сортировка');

            $table->boolean('activity')
                ->default(true)
                ->index()
                ->comment('Активность характеристики');

            $table->string('type', 50)
                ->default('text')
                ->comment('Тип значения: text, number, boolean, select и т.п.');

            $table->string('name', 50)
                ->comment('Название характеристики, например: Цвет, Материал');

            $table->string('slug', 255)
                ->unique()
                ->comment('Уникальный системный идентификатор (slug)');

            $table->string('description', 255)
                ->nullable()
                ->comment('Описание или подсказка');

            $table->boolean('all_categories')
                ->default(true)
                ->index()
                ->comment('Привязывать ко всем категориям по умолчанию');

            $table->boolean('is_filterable')
                ->default(true)
                ->index()
                ->comment('Можно ли использовать характеристику в фильтрах');

            $table->string('filter_type', 50)
                ->default('checkbox')
                ->index()
                ->comment('Тип фильтра: checkbox, select, range и т.п.');

            $table->timestamps();

            // Внешний ключ
            $table->foreign('property_group_id')
                ->references('id')
                ->on('property_groups')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
