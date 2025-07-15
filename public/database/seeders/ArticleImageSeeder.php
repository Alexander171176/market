<?php

namespace Database\Seeders;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистка таблиц перед запуском сидера
        DB::table('article_has_images')->truncate();
        DB::table('article_images')->truncate();

        // Список изображений
        $images = [
            ['order' => 1, 'alt' => 'Изображение статьи 1', 'caption' => 'описание изображения'],
        ];

        // Создание изображений и привязка к статьям
        foreach ($images as $imageData) {
            $image = ArticleImage::create($imageData);

            // Случайная привязка к статьям
            $articleIds = Article::inRandomOrder()->limit(rand(1, 3))->pluck('id');
            $image->articles()->sync($articleIds);
        }
    }
}
