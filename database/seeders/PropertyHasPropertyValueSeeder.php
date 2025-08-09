<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyValue\PropertyValue;

class PropertyHasPropertyValueSeeder extends Seeder
{
    /**
     * Заполнение связей характеристик и значений.
     */
    public function run(): void
    {
        // Отключаем проверку ключей, чтобы избежать конфликтов при truncate
        Schema::disableForeignKeyConstraints();

        try {
            // Очищаем пивот-таблицу
            DB::table('property_has_property_value')->truncate();

            /**
             * Пример связей:
             *   ключ массива = slug характеристики
             *   значение массива = массив slug-ов значений
             */
            $bindings = [
                'tsvet' => ['krasnyj', 'sinij', 'zelenyj', 'chernyj', 'belyj', 'serebristyj'],
                'material-korpusa' => ['plastik', 'metall', 'steklo', 'keramika'],
                'operativnaya-pamyat' => ['4-gb', '8-gb', '16-gb', '32-gb', '64-gb'],
            ];

            foreach ($bindings as $propertySlug => $valueSlugs) {
                $property = Property::where('slug', $propertySlug)->first();

                if ($property) {
                    $valueIds = PropertyValue::whereIn('slug', $valueSlugs)->pluck('id')->toArray();
                    // Привязываем значения к характеристике
                    $property->values()->syncWithoutDetaching($valueIds);
                }
            }
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }
}
