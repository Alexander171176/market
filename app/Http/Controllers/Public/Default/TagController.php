<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Tag\TagResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Setting\Setting;
use App\Models\Admin\Tag\Tag;
use App\Models\Admin\Video\Video;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Страница показа статей по тегу.
     *
     * @param string $slug
     * @param Request $request
     * @return Response
     */
    public function show(string $slug, Request $request): Response
    {
        $locale = app()->getLocale();
        $search = trim($request->input('search'));
        $currentPageArticles = (int) $request->input('page_articles', 1);
        $perPage = 4;

        // Получаем тег
        $tag = Tag::where('slug', $slug)->firstOrFail();

        // Увеличиваем счётчик просмотров
        $tag->increment('views');

        // Получаем статьи, у которых есть этот тег
        $articlesQuery = Article::where('activity', 1)
            ->where('locale', $locale)
            ->whereHas('tags', fn($q) => $q->where('id', $tag->id))
            ->when($search, fn($q) => $q->where('title', 'like', "%$search%"))
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'tags'
            ])
            ->orderByDesc('published_at');

        $allArticles = $articlesQuery->get();

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

        $articlesCount = $allArticles->count();

        // Дополнительные статьи и баннеры
        $leftArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('left', true)
            ->orderBy('sort', 'desc')
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->get();

        $mainArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('main', true)
            ->orderBy('sort', 'desc')
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->get();

        $rightArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('right', true)
            ->orderBy('sort', 'desc')
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->get();

        $leftBanners = Banner::where('activity', 1)
            ->where('left', true)
            ->orderBy('sort', 'desc')
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->get();

        $rightBanners = Banner::where('activity', 1)
            ->where('right', true)
            ->orderBy('sort', 'desc')
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->get();

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

        return Inertia::render('Public/Default/Tags/Show', [
            'tag' => new TagResource($tag),
            'articles' => ArticleResource::collection($paginatedArticles),
            'articlesCount' => $articlesCount,
            'pagination' => [
                'currentPage' => $paginatedArticles->currentPage(),
                'lastPage'    => $paginatedArticles->lastPage(),
                'perPage'     => $paginatedArticles->perPage(),
                'total'       => $paginatedArticles->total(),
            ],
            'locale' => $locale,
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

}
