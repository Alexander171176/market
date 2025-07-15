<?php

namespace Database\Seeders;

use App\Models\Admin\Category\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locale = 'ru'; // Задаем локаль

        // Опционально: Очистить категории только для этой локали перед заполнением
        // Это делает сидер идемпотентным (повторный запуск даст тот же результат)
        Category::query()->where('locale', $locale)->delete();

        // Опционально: Сбросить автоинкремент для PostgreSQL, если нужно начинать с ID 1
        // Может вызвать проблемы, если есть другие записи. Используйте осторожно.
        // DB::statement('ALTER SEQUENCE categories_id_seq RESTART WITH 1;');

        $rootCategories = [];
        $childrenCategories = [];
        $grandChildrenCategories = [];

        // 1. Создаем 4 корневые категории (Level 1)
        for ($i = 1; $i <= 4; $i++) {
            $title = "Главная категория {$i}";
            $rootCategories[] = Category::create([
                'parent_id' => null,
                'sort' => $i - 1, // sort = 0, 1, 2, 3
                'activity' => true,
                'locale' => $locale,
                'title' => $title,
                'url' => Str::slug($title), // Генерируем уникальный URL
                'short' => "Краткое описание главной категории {$i}",
                'description' => "Полное описание главной категории {$i}",
                'meta_title' => "Мета-заголовок главной {$i}",
                'meta_keywords' => "ключевые слова {$i}, главная",
                'meta_desc' => "Мета-описание главной {$i}",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 2. Создаем 4 дочерние категории (Level 2), по одной для каждой корневой
        foreach ($rootCategories as $index => $parent) {
            $i = $index + 1;
            $title = "Дочерняя категория {$i}.1";
            $childrenCategories[] = Category::create([
                'parent_id' => $parent->id, // Ссылка на родителя
                'sort' => 0, // Первая (и единственная) дочерняя категория у этого родителя
                'activity' => true,
                'locale' => $locale,
                'title' => $title,
                'url' => Str::slug($title),
                'short' => "Краткое описание дочерней категории {$i}.1",
                'description' => "Полное описание дочерней категории {$i}.1",
                'meta_title' => "Мета-заголовок дочерней {$i}.1",
                'meta_keywords' => "ключевые слова {$i}, дочерняя",
                'meta_desc' => "Мета-описание дочерней {$i}.1",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. Создаем 4 внучатые категории (Level 3), по одной для каждой дочерней
        foreach ($childrenCategories as $index => $parent) {
            $i = $index + 1;
            $title = "Внучатая категория {$i}.1.1";
            $grandChildrenCategories[] = Category::create([ // Сохраняем для порядка, хотя можно и без этого
                'parent_id' => $parent->id, // Ссылка на родителя (дочернюю категорию)
                'sort' => 0, // Первая (и единственная) внучатая категория у этого родителя
                'activity' => true,
                'locale' => $locale,
                'title' => $title,
                'url' => Str::slug($title),
                'short' => "Краткое описание внучатой категории {$i}.1.1",
                'description' => "Полное описание внучатой категории {$i}.1.1",
                'meta_title' => "Мета-заголовок внучатой {$i}.1.1",
                'meta_keywords' => "ключевые слова {$i}, внучатая",
                'meta_desc' => "Мета-описание внучатой {$i}.1.1",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Выводим сообщение об успехе в консоль при запуске сидера
        $this->command->info("CategorySeeder: Created 12 '{$locale}' categories (4 root, 4 children, 4 grandchildren).");
    }
}
