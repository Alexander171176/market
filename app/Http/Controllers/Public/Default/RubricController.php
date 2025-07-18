<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Rubric\RubricResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Video\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;

class RubricController extends Controller
{
    /**
     * Возвращает список активных рубрик в зависимости от выбранного языка.
     *
     * @return Response
     */
    public function index(): Response
    {
        $locale = app()->getLocale(); // ← получаем из маршрута

        $rubrics = Rubric::where('activity', 1)
            ->where('locale', $locale)
            ->orderBy('sort')
            ->get(['id', 'title', 'url', 'locale']);

        return Inertia::render('Public/Default/Rubrics/Index', [
            'rubrics' => $rubrics,
            'rubricsCount' => $rubrics->count(),
        ]);
    }

    /**
     * Страница показа рубрики
     */
    public function show(Request $request, string $url): Response
    {
        $locale = app()->getLocale();
        $search = trim($request->input('search'));
        $currentPageArticles = (int) $request->input('page_articles', 1);
        $perPage = 4;

        $rubric = Rubric::with([
            'sections' => fn($q) => $q
                ->where('activity', 1)
                ->where('locale', $locale)
                ->orderBy('sort')
        ])->where('url', $url)->firstOrFail();

        // Увеличиваем счётчик просмотров
        $rubric->increment('views');

        $allArticles = $rubric->sections->flatMap(function ($section) use ($locale, $search) {
            return $section->articles()
                ->where('activity', 1)
                ->where('locale', $locale)
                ->when($search, fn($q) => $q->where('title', 'like', "%$search%"))
                ->with([
                    'images' => fn($q) => $q->orderBy('order'),
                    'tags'
                ])
                ->get();
        });

        $allArticles = $allArticles->sortByDesc('published_at')->values();

        $paginatedArticles = new LengthAwarePaginator(
            $allArticles->forPage($currentPageArticles, $perPage),
            $allArticles->count(),
            $perPage,
            $currentPageArticles,
            [
                'path' => request()->url(),
                'pageName' => 'page_articles',
                'query' => request()->query(),
            ]
        );

        $leftArticles = $allArticles->where('left', true)->take(3)->values();
        $mainArticles = $allArticles->where('main', true)->take(3)->values();
        $rightArticles = $allArticles->where('right', true)->take(3)->values();

        $leftBanners = Banner::where('activity', 1)->where('left', true)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $rightBanners = Banner::where('activity', 1)->where('right', true)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $sectionBanners = Banner::where('activity', 1)
            ->whereHas('sections', fn($q) => $q->where('activity', 1)->where('locale', $locale))
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'sections' => fn($q) => $q->where('activity', 1)->where('locale', $locale),
            ])
            ->orderBy('sort')
            ->get();

        $sectionVideos = Video::where('activity', 1)
            ->where('locale', $locale)
            ->whereHas('sections', fn($q) => $q
                ->where('activity', 1)
                ->where('locale', $locale)
                ->whereIn('sections.id', $rubric->sections->pluck('id'))
            )
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $activeArticlesCount = $allArticles->count();

        $leftVideos = Video::where('activity', 1)
            ->where('left', true)
            ->orderBy('sort')
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->get();

        $rightVideos = Video::where('activity', 1)
            ->where('right', true)
            ->orderBy('sort')
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->get();

        return Inertia::render('Public/Default/Rubrics/Show', [
            'rubric' => new RubricResource($rubric),
            'sections' => SectionResource::collection($rubric->sections),
            'sectionBanners' => BannerResource::collection($sectionBanners),
            'sectionVideos' => VideoResource::collection($sectionVideos),
            'sectionsCount' => $rubric->sections->count(),
            'articles' => ArticleResource::collection($paginatedArticles),
            'pagination' => [
                'currentPage' => $paginatedArticles->currentPage(),
                'lastPage' => $paginatedArticles->lastPage(),
                'perPage' => $paginatedArticles->perPage(),
                'total' => $paginatedArticles->total(),
            ],
            'locale' => $locale,
            'activeArticlesCount' => $activeArticlesCount,
            'filters' => [
                'search' => $search,
            ],
            'leftArticles' => ArticleResource::collection($leftArticles),
            'mainArticles' => ArticleResource::collection($mainArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'leftBanners' => BannerResource::collection($leftBanners),
            'rightBanners' => BannerResource::collection($rightBanners),
            'leftVideos' => VideoResource::collection($leftVideos),
            'rightVideos' => VideoResource::collection($rightVideos),
        ]);
    }

    /**
     * Возвращает список активных рубрик в зависимости от выбранного языка.
     *
     * @return JsonResponse
     */
    public function menuRubrics(): JsonResponse
    {
        $locale = app()->getLocale(); // ← получаем из маршрута

        $rubrics = Rubric::where('activity', 1)
            ->where('locale', $locale)
            ->orderBy('sort')
            ->get(['id', 'title', 'url', 'locale']);

        return response()->json([
            'locale' => $locale,
            'rubrics' => $rubrics,
            'rubricsCount' => $rubrics->count(),
        ]);
    }

}
