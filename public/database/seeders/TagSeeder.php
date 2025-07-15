<?php

namespace Database\Seeders;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Tag\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистка таблиц перед добавлением новых записей
        DB::table('tags')->truncate();
        DB::table('article_has_tag')->truncate();

        // Список тегов
        $tags = [
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'HTML',
                'slug' => 'html',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'CSS',
                'slug' => 'css',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'JavaScript',
                'slug' => 'javascript',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'Vue.js',
                'slug' => 'vuejs',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'Laravel',
                'slug' => 'laravel',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'Tailwind CSS',
                'slug' => 'tailwind-css',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'Web-разработка',
                'slug' => 'web-development',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'SEO',
                'slug' => 'seo',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'UI/UX',
                'slug' => 'ui-ux',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
            [
                'sort' => '0',
                'activity' => true,
                'locale' => 'ru',
                'name' => 'Программирование',
                'slug' => 'programming',
                'short' => 'краткое описание',
                'description' => 'описание',
                'views' => 0,
                'meta_title' => '',
                'meta_keywords' => '',
                'meta_desc' => '',
            ],
        ];

        // Создаем теги
        $createdTags = [];
        foreach ($tags as $tag) {
            $createdTags[] = Tag::create($tag);
        }

        // Привязываем теги к статьям
        $articles = Article::all();
        foreach ($articles as $article) {
            // Случайно выбираем 1-3 тега для каждой статьи
            $randomTags = collect($createdTags)->random(rand(1, 3))->pluck('id');
            $article->tags()->sync($randomTags);
        }
    }
}
