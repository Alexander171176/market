<?php

namespace Database\Seeders;

use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        try {
            // чистим характеристики и пивот (значения не трогаем — их сидит PropertyValueSeeder)
            DB::table('properties')->truncate();
            DB::table('property_has_property_value')->truncate();

            $groupMain       = PropertyGroup::where('name', 'Основные характеристики')->first();
            $groupDesign     = PropertyGroup::where('name', 'Дизайн и материалы')->first();
            $groupDimensions = PropertyGroup::where('name', 'Габариты и вес')->first();

            // 1) создаём характеристики
            $propertiesData = [
                [
                    'property_group_id' => $groupDesign?->id,
                    'locale' => 'ru',
                    'name' => 'Цвет',
                    'slug' => 'tsvet',
                    'type' => 'select',
                    'is_filterable' => true,
                    'filter_type' => 'checkbox',
                    'sort' => 10,
                    'activity' => true,
                ],
                [
                    'property_group_id' => $groupDesign?->id,
                    'locale' => 'ru',
                    'name' => 'Материал корпуса',
                    'slug' => 'material-korpusa',
                    'type' => 'checkbox',
                    'is_filterable' => true,
                    'filter_type' => 'checkbox',
                    'sort' => 20,
                    'activity' => true,
                ],
                [
                    'property_group_id' => $groupMain?->id,
                    'locale' => 'ru',
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
                    'locale' => 'ru',
                    'name' => 'Вес',
                    'slug' => 'ves',
                    'type' => 'number',
                    'is_filterable' => true,
                    'filter_type' => 'range',
                    'sort' => 40,
                    'activity' => true,
                ],
                [
                    'property_group_id' => null,
                    'locale' => 'ru',
                    'name' => 'Гарантия',
                    'slug' => 'garantiya',
                    'type' => 'text',
                    'is_filterable' => false,
                    'filter_type' => 'checkbox',
                    'sort' => 50,
                    'activity' => true,
                ],
            ];

            $properties = [];
            foreach ($propertiesData as $p) {
                $p['all_categories'] = $p['all_categories'] ?? true;
                $p['description']    = $p['description'] ?? ('Описание для '.mb_strtolower($p['name']));
                $properties[$p['slug']] = Property::create($p);
            }

            // 2) привязываем значения к нужным характеристикам через пивот
            // карта: slug характеристики => список названий значений
            $map = [
                'tsvet' => ['Красный', 'Синий', 'Зеленый', 'Черный', 'Белый', 'Серебристый'],
                'material-korpusa' => ['Пластик', 'Металл', 'Стекло', 'Керамика'],
                'operativnaya-pamyat' => ['4 ГБ', '8 ГБ', '16 ГБ', '32 ГБ', '64 ГБ'],
                // 'ves' — числовая, без списка вариантов
                // 'garantiya' — текстовая, без списка вариантов
            ];

            foreach ($map as $propSlug => $names) {
                /** @var Property|null $prop */
                $prop = $properties[$propSlug] ?? null;
                if (!$prop) continue;

                $attach = [];
                foreach ($names as $i => $name) {
                    // находим значение (оно уже сидировано PropertyValueSeeder'ом)
                    $value = PropertyValue::firstOrCreate(
                        ['locale' => 'ru', 'name' => $name],
                        [
                            'slug'     => Str::slug($name),
                            'activity' => true,
                            'sort'     => ($i + 1) * 10,
                        ]
                    );

                    $attach[$value->id] = ['sort' => ($i + 1) * 10];
                }

                // привязываем без потери уже добавленных (на всякий случай)
                $prop->values()->syncWithoutDetaching($attach);
            }
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }
}
