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
        $perPage = 4;

        // 🔹 Получение тега
        $tag = Tag::where('slug', $slug)->firstOrFail();
        $tag->increment('views');

        // 🔹 Пагинация по статьям с этим тегом
        $paginatedArticles = Article::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->whereHas('tags', fn($q) => $q->where('id', $tag->id))
            ->when($search, fn($q) => $q->where('title', 'like', "%$search%"))
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'tags',
            ])
            ->orderByDesc('published_at')
            ->paginate($perPage, ['*'], 'page_articles');

        $articlesCount = $paginatedArticles->total();

        // 🔹 Единый запрос для статей с флагами
        $flaggedArticles = Article::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where(function ($q) {
                $q->where('left', true)
                    ->orWhere('main', true)
                    ->orWhere('right', true);
            })
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->orderByDesc('sort')
            ->get();

        $leftArticles  = $flaggedArticles->where('left', true)->take(3)->values();
        $mainArticles  = $flaggedArticles->where('main', true)->take(3)->values();
        $rightArticles = $flaggedArticles->where('right', true)->take(3)->values();

        // 🏁 Один запрос ко всем активным баннерам
        $allBanners = Banner::query()
            ->where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        // ⚡ Группировка баннеров
        $leftBanners = $allBanners->where('left', true)->values();
        $rightBanners = $allBanners->where('right', true)->values();

        // 🎥 Один запрос ко всем активным видео
        $allVideos = Video::query()
            ->where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        // ⚡ Группировка видео
        $leftVideos = $allVideos->where('left', true)->values();
        $rightVideos = $allVideos->where('right', true)->values();

        return Inertia::render('Public/Default/Tags/Show', [
            'tag'           => new TagResource($tag),
            'articles'      => ArticleResource::collection($paginatedArticles),
            'articlesCount' => $articlesCount,
            'pagination' => [
                'currentPage' => $paginatedArticles->currentPage(),
                'lastPage'    => $paginatedArticles->lastPage(),
                'perPage'     => $paginatedArticles->perPage(),
                'total'       => $paginatedArticles->total(),
            ],
            'locale'        => $locale,
            'filters'       => ['search' => $search],
            'leftArticles'  => ArticleResource::collection($leftArticles),
            'mainArticles'  => ArticleResource::collection($mainArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'leftBanners'   => BannerResource::collection($leftBanners),
            'rightBanners'  => BannerResource::collection($rightBanners),
            'leftVideos'    => VideoResource::collection($leftVideos),
            'rightVideos'   => VideoResource::collection($rightVideos),
        ]);
    }

}
