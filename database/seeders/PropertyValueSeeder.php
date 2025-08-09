<?php

namespace Database\Seeders;

use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class PropertyValueSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        try {
            // Чистим только справочник значений
            DB::table('property_values')->truncate();

            // Глобальный каталог значений (без привязки к конкретной характеристике)
            $valuesRu = [
                // Цвета
                'Красный', 'Синий', 'Зеленый', 'Черный', 'Белый', 'Серебристый',
                // Материалы
                'Пластик', 'Металл', 'Стекло', 'Керамика',
                // ОЗУ
                '4 ГБ', '8 ГБ', '16 ГБ', '32 ГБ', '64 ГБ',
            ];

            foreach ($valuesRu as $i => $name) {
                PropertyValue::firstOrCreate(
                    ['locale' => 'ru', 'name' => $name],
                    [
                        'slug'     => Str::slug($name),
                        'activity' => true,
                        'sort'     => ($i + 1) * 10,
                    ]
                );
            }

            // при необходимости добавляй и другие локали:
            // $valuesEn = [...]; // locale => 'en'
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }
}
