<?php

namespace App\Http\Controllers\Admin\Chart;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ChartController extends Controller
{
    /**
     * Отображение страницы с графиками.
     */
    public function index(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('show-charts');

        // --- График: Просмотры по Рубрикам ---
        $rubricsWithArticleViews = DB::table('rubrics')
            ->join('rubric_has_sections', 'rubrics.id', '=', 'rubric_has_sections.rubric_id')
            ->join('sections', 'rubric_has_sections.section_id', '=', 'sections.id')
            ->join('article_has_section', 'sections.id', '=', 'article_has_section.section_id')
            ->join('articles', 'article_has_section.article_id', '=', 'articles.id')
            ->select(
                'rubrics.id',
                'rubrics.title as name',
                'rubrics.created_at',
                'rubrics.updated_at',
                DB::raw('COALESCE(SUM(articles.views), 0) as value')
            )
            ->groupBy('rubrics.id', 'rubrics.title', 'rubrics.created_at', 'rubrics.updated_at')
            ->orderByDesc('value')
            ->limit(15)
            ->get();

        // --- График: Просмотры и лайки статей ---
        $articles = Article::select('id', 'title', 'views')
            ->withCount('likes')
            ->orderByDesc('views')
            ->limit(50)
            ->get();

        return Inertia::render('Admin/Charts/Index', [
            'rubrics' => $rubricsWithArticleViews,
            'articles' => $articles,
        ]);
    }
}
