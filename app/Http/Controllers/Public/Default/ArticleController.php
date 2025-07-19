<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Video\Video;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    use HasPublicBlocksTrait;

    /**
     * Страница показа конкретной статьи.
     */
    public function show(string $url): Response
    {
        $locale = app()->getLocale();

        // Статья с лайками, изображениями и связанными статьями
        $article = Article::withCount('likes')
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'tags',
                'relatedArticles' => fn($q) => $q
                    ->where('activity', 1)
                    ->where('locale', $locale)
                    ->with(['images' => fn($q) => $q->orderBy('order')])
            ])
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where('url', $url)
            ->firstOrFail();

        $article->increment('views');

        $alreadyLiked = auth()->check()
            ? $article->likes()->where('user_id', auth()->id())->exists()
            : false;

        // Флагированные блоки
        $flaggedArticles = $this->getFlaggedArticles();
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        // Видео, связанные с этой статьей
        $videosWithThisArticle = Video::whereHas('articles', function ($q) use ($article) {
            $q->where('articles.id', $article->id);
        })
            ->with(['relatedVideos' => fn($q) => $q
                ->where('activity', 1)
                ->where('locale', app()->getLocale())
                ->with(['images' => fn($q) => $q->orderBy('order')])
                ->orderBy('sort')
            ])
            ->get();

        $recommendedVideos = $videosWithThisArticle
            ->flatMap(fn($video) => $video->relatedVideos)
            ->unique('id')
            ->values();

        return Inertia::render('Public/Default/Articles/Show', [
            'article' => array_merge(
                (new ArticleResource($article))->resolve(),
                ['already_liked' => $alreadyLiked]
            ),

            'leftArticles' => ArticleResource::collection($flaggedArticles['left']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),
            'recommendedArticles' => ArticleResource::collection($article->relatedArticles),

            'leftBanners' => BannerResource::collection($banners['left']),
            'rightBanners' => BannerResource::collection($banners['right']),

            'leftVideos' => VideoResource::collection($videos['left']),
            'rightVideos' => VideoResource::collection($videos['right']),
            'recommendedVideos' => VideoResource::collection($recommendedVideos),
        ]);
    }

    /**
     * Лайк статьи.
     */
    public function like(string $id): JsonResponse
    {
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Для постановки лайка нужно авторизоваться.',
            ], 401);
        }

        $article = Article::findOrFail($id);
        $user = auth()->user();

        if ($article->likes()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Вы уже поставили лайк.',
                'likes'   => $article->likes()->count(),
            ]);
        }

        $article->likes()->create(['user_id' => $user->id]);

        return response()->json([
            'success' => true,
            'likes'   => $article->likes()->count(),
        ]);
    }
}
