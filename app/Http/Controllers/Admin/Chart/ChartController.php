<?php

namespace App\Http\Controllers\Admin\Chart;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Section\Section; // Добавим для запроса по рубрикам
use App\Models\Admin\Video\Video;   // Добавим модель Video
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class ChartController extends Controller
{
    /**
     * Отображение страницы с графиками.
     */
    public function index(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('show-charts');

        // --- 1. Данные для графика "Статьи по Рубрикам" (количество) ---
        $rubricsWithArticleCount = Rubric::query()
            // ->where('locale', app()->getLocale()) // Опционально: фильтр по локали
            ->select('rubrics.id', 'rubrics.title')
            // Считаем статьи через секции
            ->withCount(['sections as articles_count' => function ($query) {
                // Присоединяем pivot таблицу article_has_section
                $query->join('article_has_section', 'sections.id', '=', 'article_has_section.section_id')
                    // Считаем уникальные article_id
                    ->select(DB::raw('count(distinct article_has_section.article_id)'));
                // ИЛИ если просто нужна проверка наличия статей в секции:
                // $query->whereHas('articles');
            }])
            ->orderBy('articles_count', 'desc')
            ->limit(15)
            ->get()
            ->map(fn($rubric) => [
                'name' => $rubric->title,
                'value' => $rubric->articles_count ?? 0, // Используем ?? 0 на случай, если withCount вернет null
            ]);

        // --- 2. Данные для графика "Просмотры по Рубрикам" (сумма просмотров статей) ---
        $rubricsWithArticleViews = Rubric::query()
            // ->where('locale', app()->getLocale())
            ->select('rubrics.id', 'rubrics.title')
            // Загружаем сумму просмотров статей, связанных через секции
            ->withSum(['sections as articles_views_sum' => function ($query) {
                // Выбираем сумму просмотров из таблицы articles, соединенной через article_has_section
                $query->join('article_has_section', 'sections.id', '=', 'article_has_section.section_id')
                    ->join('articles', 'article_has_section.article_id', '=', 'articles.id')
                    ->select(DB::raw('sum(articles.views)')); // Суммируем просмотры статей
            }], 'articles.views') // Указываем колонку для суммирования (на самом деле withSum не поддерживает это для вложенных связей напрямую)
            // ПЕРЕДЕЛАЕМ через join и groupBy для надежности
            /*
             ->leftJoin('rubric_has_sections', 'rubrics.id', '=', 'rubric_has_sections.rubric_id')
             ->leftJoin('sections', 'rubric_has_sections.section_id', '=', 'sections.id')
             ->leftJoin('article_has_section', 'sections.id', '=', 'article_has_section.section_id')
             ->leftJoin('articles', 'article_has_section.article_id', '=', 'articles.id')
             ->select('rubrics.id', 'rubrics.title', DB::raw('COALESCE(SUM(articles.views), 0) as total_views'))
             ->groupBy('rubrics.id', 'rubrics.title')
             ->orderBy('total_views', 'desc')
             ->limit(15)
             ->get()
             ->map(fn($rubric) => [
                 'name' => $rubric->title,
                 'value' => (int)$rubric->total_views,
             ]);
            */
            // АЛЬТЕРНАТИВА: Проще получить все рубрики и вычислить в PHP (менее эффективно, но проще код)
            ->with(['sections.articles' => function ($query) {
                $query->select('articles.id', 'articles.views'); // Выбираем только views
            }])
            ->get()
            ->map(fn($rubric) => [
                'name' => $rubric->title,
                'value' => $rubric->sections->flatMap->articles->sum('views') ?? 0, // Суммируем просмотры
            ])
            ->sortByDesc('value') // Сортируем коллекцию
            ->take(15); // Берем топ 15


        // --- 3. Данные для графика "Статьи по месяцам" (количество) ---
        $articlesByMonth = Article::query()
            ->where('created_at', '>=', Carbon::now()->subMonths(11)->startOfMonth()) // 12 месяцев включая текущий
            // ->where('locale', app()->getLocale())
            ->select(
                DB::raw("TO_CHAR(created_at, 'YYYY-MM') as month"), // PostgreSQL
                // DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), // MySQL
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->pluck('count', 'month'); // Получаем коллекцию ['YYYY-MM' => count]

        $articlesOverTime = $this->fillMissingMonths($articlesByMonth, 12); // Используем хелпер


        // --- 4. Суммарные просмотры/лайки ---
        $totalArticleViews = (int) Article::sum('views');
        $totalArticleLikes = (int) Article::sum('likes');
        $totalVideoViews = (int) Video::sum('views');
        $totalVideoLikes = (int) Video::sum('likes');

        // --- 5. Общее количество сущностей ---
        $rubricsCount = Rubric::count();
        $articlesCount = Article::count();
        $videosCount = Video::count();
        // ... и т.д. для других сущностей

        return Inertia::render('Admin/Charts/Index', [
            'chartData' => [
                'rubricsWithArticlesCount' => $rubricsWithArticleCount,
                'rubricsWithArticlesViews' => $rubricsWithArticleViews, // <--- ДОБАВЛЕНО
                'articlesOverTime' => $articlesOverTime,
                // Можно добавить агрегацию просмотров/лайков по месяцам аналогично 'articlesOverTime'
            ],
            'totals' => [ // Передаем общие суммы
                'articleViews' => $totalArticleViews,
                'articleLikes' => $totalArticleLikes,
                'videoViews' => $totalVideoViews,
                'videoLikes' => $totalVideoLikes,
            ],
            'counts' => [ // Передаем общие количества
                'rubrics' => $rubricsCount,
                'articles' => $articlesCount,
                'videos' => $videosCount,
                // ...
            ],
            // Настройки для заголовков таблиц на фронте
            'adminCountSettings' => [
                'rubrics' => config('site_settings.AdminCountRubrics', 15),
                'articles' => config('site_settings.AdminCountArticles', 15),
                'videos' => config('site_settings.AdminCountVideos', 15),
                // ...
            ],
            'adminSortSettings' => [
                'rubrics' => config('site_settings.AdminSortRubrics', 'idDesc'),
                'articles' => config('site_settings.AdminSortArticles', 'idDesc'),
                'videos' => config('site_settings.AdminSortVideos', 'idDesc'),
                // ...
            ]
        ]);
    }

    /**
     * Вспомогательная функция для заполнения пропущенных месяцев в коллекции.
     *
     * @param Collection $data ['YYYY-MM' => count]
     * @param int $numberOfMonths Количество месяцев для заполнения (назад от текущего)
     * @return Collection ['YYYY-MM' => count]
     */
    private function fillMissingMonths(Collection $data, int $numberOfMonths): Collection
    {
        $result = collect();
        $endDate = Carbon::now()->endOfMonth();
        // Начинаем с месяца $numberOfMonths-1 назад от текущего
        $currentDate = Carbon::now()->subMonths($numberOfMonths - 1)->startOfMonth();

        while ($currentDate->lte($endDate)) {
            $monthKey = $currentDate->format('Y-m');
            $result->put($monthKey, $data->get($monthKey, 0));
            $currentDate->addMonth();
        }
        return $result;
    }
}
