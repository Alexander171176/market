<?php

namespace Database\Seeders;

use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema; // <-- 1. ДОБАВИТЬ

class PropertyValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2. ОТКЛЮЧИТЬ ПРОВЕРКУ
        Schema::disableForeignKeyConstraints();

        try {
            DB::table('property_values')->truncate();

            // Данные в формате: 'property_slug' => ['значение1', 'значение2', ...]
            $data = [
                'tsvet' => ['Красный', 'Синий', 'Зеленый', 'Черный', 'Белый', 'Серебристый'],
                'material-korpusa' => ['Пластик', 'Металл', 'Стекло', 'Керамика'],
                'operativnaya-pamyat' => ['4 ГБ', '8 ГБ', '16 ГБ', '32 ГБ', '64 ГБ'],
            ];

            foreach ($data as $propertySlug => $values) {
                // Находим родительскую характеристику по slug
                $property = Property::where('slug', $propertySlug)->first();

                // Если характеристика найдена, создаем для нее значения
                if ($property) {
                    foreach ($values as $index => $value) {
                        PropertyValue::create([
                            'property_id' => $property->id,
                            'value' => $value,
                            'slug' => Str::slug($value),
                            'sort' => ($index + 1) * 10, // Сортировка 10, 20, 30...
                        ]);
                    }
                }
            }
        } finally {
            // 3. ВСЕГДА ВКЛЮЧАТЬ ПРОВЕРКУ ОБРАТНО
            Schema::enableForeignKeyConstraints();
        }
    }
}
