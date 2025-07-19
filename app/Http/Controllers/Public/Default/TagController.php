<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Tag\TagResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Tag\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    use HasPublicBlocksTrait;

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
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->orderByDesc('published_at')
            ->paginate($perPage, ['*'], 'page_articles');

        $flaggedArticles = $this->getFlaggedArticles();
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        return Inertia::render('Public/Default/Tags/Show', [
            'tag'           => new TagResource($tag),
            'articles'      => ArticleResource::collection($paginatedArticles),
            'articlesCount' => $paginatedArticles->total(),

            'pagination' => [
                'currentPage' => $paginatedArticles->currentPage(),
                'lastPage'    => $paginatedArticles->lastPage(),
                'perPage'     => $paginatedArticles->perPage(),
                'total'       => $paginatedArticles->total(),
            ],

            'locale'        => $locale,
            'filters'       => ['search' => $search],

            'leftArticles'  => ArticleResource::collection($flaggedArticles['left']),
            'mainArticles'  => ArticleResource::collection($flaggedArticles['main']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),

            'leftBanners'   => BannerResource::collection($banners['left']),
            'rightBanners'  => BannerResource::collection($banners['right']),

            'leftVideos'    => VideoResource::collection($videos['left']),
            'rightVideos'   => VideoResource::collection($videos['right']),
        ]);
    }
}
