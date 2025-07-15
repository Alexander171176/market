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

        // Получаем рубрику "Вентиляция и Кондиционирование"
        $rubric = Rubric::where('title', 'Вентиляция и Кондиционирование')->first();

        if (!$rubric) {
            Log::warning('Рубрика "Вентиляция и Кондиционирование" не найдена. Сидер ArticleSeeder прерван.');
            return;
        }

        $defaultIcon = '<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path d="M23,9h-0.414C21.549,5.32,18.681,2.451,15,1.414V1c0-0.552-0.447-1-1-1h-4C9.447,0,9,0.448,9,1v0.414 C5.319,2.451,2.451,5.32,1.414,9H1c-0.553,0-1,0.448-1,1v4c0,0.552,0.447,1,1,1h0.414C2.451,18.68,5.319,21.549,9,22.586V23 c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1v-0.414c3.681-1.037,6.549-3.906,7.586-7.586H23c0.553,0,1-0.448,1-1v-4 C24,9.448,23.553,9,23,9z M12,16c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S14.206,16,12,16z M20.482,9h-3.294 C16.662,8.093,15.907,7.338,15,6.812V3.518C17.567,4.42,19.58,6.433,20.482,9z M9,3.518v3.294C8.093,7.338,7.338,8.093,6.812,9 H3.518C4.42,6.433,6.433,4.42,9,3.518z M3.518,15h3.294C7.338,15.907,8.093,16.662,9,17.188v3.294C6.433,19.58,4.42,17.567,3.518,15 z M15,20.482v-3.294c0.907-0.526,1.662-1.282,2.188-2.188h3.294C19.58,17.567,17.567,19.58,15,20.482z"></path></svg>';

        $sections = [
            [
                'sort' => 1,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'ru',
                'title' => 'Вентиляция и Кондиционирование',
                'short' => 'Услуги вентиляции и кондиционирование для всего Казахстана.',
                'description' => 'Профессиональные услуги вентиляции и кондиционирования по всему Казахстану — комфортный климат в вашем доме и бизнесе, гарантия качества.',
            ],
            [
                'sort' => 2,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'kk',
                'title' => 'Желдету және кондиционерлеу',
                'short' => 'Бүкіл Қазақстан бойынша желдету және кондиционерлеу қызметтері.',
                'description' => 'Қазақстан бойынша кәсіби желдету және ауа баптау қызметтері – үйіңіздегі және бизнесіңіздегі жайлы климат, сапа кепілдігі.',
            ],
            [
                'sort' => 3,
                'activity' => 1,
                'icon' => $defaultIcon,
                'locale' => 'en',
                'title' => 'Ventilation and Air Conditioning',
                'short' => 'Ventilation and air conditioning services for the whole of Kazakhstan.',
                'description' => 'Professional ventilation and air conditioning services throughout Kazakhstan — a comfortable climate in your home and business, quality assurance.',
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
