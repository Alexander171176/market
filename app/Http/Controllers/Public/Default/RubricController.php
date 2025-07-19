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
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class RubricController extends Controller
{
    use HasPublicBlocksTrait;

    public function index(): Response
    {
        $locale = app()->getLocale();

        $rubrics = Rubric::where('activity', 1)
            ->where('locale', $locale)
            ->orderBy('sort')
            ->get(['id', 'title', 'url', 'locale']);

        return Inertia::render('Public/Default/Rubrics/Index', [
            'rubrics' => $rubrics,
            'rubricsCount' => $rubrics->count(),
        ]);
    }

    public function show(Request $request, string $url): Response
    {
        $locale = app()->getLocale();
        $search = trim($request->input('search'));
        $perPage = 4;

        $rubric = Rubric::with([
            'sections' => fn($q) => $q
                ->where('activity', 1)
                ->where('locale', $locale)
                ->orderBy('sort')
        ])->where('url', $url)->firstOrFail();

        $rubric->increment('views');
        $sectionIds = $rubric->sections->pluck('id');

        $paginatedArticles = \App\Models\Admin\Article\Article::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->whereHas('sections', fn($q) =>
            $q->whereIn('sections.id', $sectionIds)
                ->where('activity', 1)
                ->where('locale', $locale)
            )
            ->when($search, fn($q) => $q->where('title', 'like', "%$search%"))
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->orderByDesc('published_at')
            ->paginate($perPage, ['*'], 'page_articles');

        $flaggedArticles = $this->getFlaggedArticles($sectionIds->all());
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        $sectionBanners = Banner::query()
            ->where('activity', 1)
            ->whereHas('sections', fn($q) => $q
                ->whereIn('sections.id', $sectionIds)
                ->where('activity', 1)
                ->where('locale', $locale))
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'sections' => fn($q) => $q->where('activity', 1)->where('locale', $locale),
            ])
            ->orderBy('sort')
            ->get();

        $sectionVideos = Video::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->whereHas('sections', fn($q) => $q
                ->whereIn('sections.id', $sectionIds)
                ->where('activity', 1)
                ->where('locale', $locale))
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
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
            'activeArticlesCount' => $paginatedArticles->total(),

            'filters' => [
                'search' => $search,
            ],

            'leftArticles' => ArticleResource::collection($flaggedArticles['left']),
            'mainArticles' => ArticleResource::collection($flaggedArticles['main']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),

            'leftBanners' => BannerResource::collection($banners['left']),
            'rightBanners' => BannerResource::collection($banners['right']),

            'leftVideos' => VideoResource::collection($videos['left']),
            'rightVideos' => VideoResource::collection($videos['right']),
        ]);
    }

    public function menuRubrics(): JsonResponse
    {
        $locale = app()->getLocale();

        $rubrics = Cache::remember("menu_rubrics_{$locale}", now()->addMinutes(60), function () use ($locale) {
            return Rubric::where('activity', 1)
                ->where('locale', $locale)
                ->orderBy('sort')
                ->get(['id', 'title', 'url', 'locale', 'sort', 'views']);
        });

        return response()->json([
            'locale' => $locale,
            'rubrics' => $rubrics,
            'rubricsCount' => $rubrics->count(),
        ]);
    }
}
