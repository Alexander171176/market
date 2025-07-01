<?php

namespace Database\Seeders;

use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Section\Section;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очищаем таблицу перед добавлением новых записей
        DB::table('sections')->truncate();

        // Получаем рубрику "Новости"
        $rubric = Rubric::where('title', 'Новости')->first();

        if (!$rubric) {
            Log::warning('Рубрика "Новости" не найдена. Сидер ArticleSeeder прерван.');
            return;
        }

        $defaultIcon = '<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3" viewBox="0 0 16 16"><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6 0 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z"></path></svg>';

        $sections = [
            [
                'sort' => 1,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'ru',
                'title' => 'Новости',
                'short' => 'Новости в мире спорта.',
                'description' => 'Описание',
            ],
            [
                'sort' => 2,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'ru',
                'title' => 'Обзоры',
                'short' => 'Обзоры поединков.',
                'description' => 'Описание',
            ],
            [
                'sort' => 3,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'ru',
                'title' => 'Интервью',
                'short' => 'Интервью с известностями.',
                'description' => 'Описание',
            ],
            [
                'sort' => 4,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'ru',
                'title' => 'Результаты',
                'short' => 'Результаты боёв соперников.',
                'description' => 'Описание',
            ],
        ];

        // Создаем статьи и связываем их с рубрикой
        foreach ($sections as $sectionData) {
            $section = Section::create($sectionData);
            $section->rubrics()->attach($rubric->id);
            Log::info("Создана секция: {$section->title} и связана с рубрикой: {$rubric->title}");
        }
    }
}
