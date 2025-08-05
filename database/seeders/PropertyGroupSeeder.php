<?php

namespace Database\Seeders;

use App\Models\Admin\PropertyGroup\PropertyGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PropertyGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Отключаем проверку внешних ключей
        Schema::disableForeignKeyConstraints();

        try {
            // 2. Очищаем таблицу
            DB::table('property_groups')->truncate();

            // 3. Наполняем данными
            $groups = [
                [
                    'name' => 'Основные характеристики',
                    'sort' => 10,
                    'activity' => true,
                ],
                [
                    'name' => 'Дизайн и материалы',
                    'sort' => 20,
                    'activity' => true,
                ],
                [
                    'name' => 'Габариты и вес',
                    'sort' => 30,
                    'activity' => true,
                ],
                [
                    'name' => 'Питание',
                    'sort' => 40,
                    'activity' => false, // Пример неактивной группы
                ],
            ];

            foreach ($groups as $group) {
                PropertyGroup::create($group);
            }

        } finally {
            // 4. Всегда включаем проверку обратно, даже если была ошибка
            Schema::enableForeignKeyConstraints();
        }
    }
}
