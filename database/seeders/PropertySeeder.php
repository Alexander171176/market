<?php

namespace Database\Seeders;

use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema; // <-- 1. ДОБАВИТЬ ЭТОТ use

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2. ОТКЛЮЧИТЬ ПРОВЕРКУ КЛЮЧЕЙ
        Schema::disableForeignKeyConstraints();

        try {
            // Теперь эта команда выполнится без ошибок
            DB::table('properties')->truncate();

            // Находим группы по имени, чтобы не зависеть от ID
            $groupMain = PropertyGroup::where('name', 'Основные характеристики')->first();
            $groupDesign = PropertyGroup::where('name', 'Дизайн и материалы')->first();
            $groupDimensions = PropertyGroup::where('name', 'Габариты и вес')->first();

            $properties = [
                [
                    'property_group_id' => $groupDesign?->id, // Используем `?->id` для безопасности
                    'name' => 'Цвет',
                    'slug' => 'tsvet',
                    'type' => 'select', // Одна характеристика - одно значение (один цвет)
                    'is_filterable' => true,
                    'filter_type' => 'checkbox',
                    'sort' => 10,
                    'activity' => true,
                ],
                [
                    'property_group_id' => $groupDesign?->id,
                    'name' => 'Материал корпуса',
                    'slug' => 'material-korpusa',
                    'type' => 'checkbox', // У товара может быть несколько материалов
                    'is_filterable' => true,
                    'filter_type' => 'checkbox',
                    'sort' => 20,
                    'activity' => true,
                ],
                [
                    'property_group_id' => $groupMain?->id,
                    'name' => 'Оперативная память',
                    'slug' => 'operativnaya-pamyat',
                    'type' => 'select',
                    'is_filterable' => true,
                    'filter_type' => 'select',
                    'sort' => 30,
                    'activity' => true,
                ],
                [
                    'property_group_id' => $groupDimensions?->id,
                    'name' => 'Вес',
                    'slug' => 'ves',
                    'type' => 'number', // Для числовых значений без списка вариантов
                    'is_filterable' => true,
                    'filter_type' => 'range', // Фильтр по диапазону
                    'sort' => 40,
                    'activity' => true,
                ],
                [
                    'property_group_id' => null, // Пример характеристики без группы
                    'name' => 'Гарантия',
                    'slug' => 'garantiya',
                    'type' => 'text',
                    'is_filterable' => false,
                    'filter_type' => 'checkbox',
                    'sort' => 50,
                    'activity' => true,
                ],
            ];

            foreach ($properties as $property) {
                // Устанавливаем значения по умолчанию, если они не заданы
                $property['all_categories'] = $property['all_categories'] ?? true;
                $property['description'] = $property['description'] ?? 'Описание для '
                . strtolower($property['name']);
                Property::create($property);
            }
        } finally {
            // 3. ВСЕГДА ВКЛЮЧАТЬ ПРОВЕРКУ ОБРАТНО
            Schema::enableForeignKeyConstraints();
        }
    }
}
