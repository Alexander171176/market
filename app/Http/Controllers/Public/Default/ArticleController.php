<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Setting\Setting;
use App\Models\Admin\Video\Video;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
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

        // Увеличиваем просмотры
        $article->increment('views');

        // Уже лайкал?
        $alreadyLiked = auth()->check()
            ? $article->likes()->where('user_id', auth()->id())->exists()
            : false;

        // Заранее загружаем все статьи с флагами left / right
        $sideArticles = Article::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where(function ($q) {
                $q->where('left', true)->orWhere('right', true);
            })
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->orderBy('sort', 'desc')
            ->get();

        $leftArticles = $sideArticles->where('left', true)->values();
        $rightArticles = $sideArticles->where('right', true)->values();

        // Загрузка всех баннеров и разбиение
        $allBanners = Banner::query()
            ->where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftBanners = $allBanners->where('left', true)->values();
        $rightBanners = $allBanners->where('right', true)->values();

        // Загрузка всех видео и разбиение
        $allVideos = Video::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftVideos = $allVideos->where('left', true)->values();
        $rightVideos = $allVideos->where('right', true)->values();

        // Видео, в которых участвует эта статья
        $videosWithThisArticle = Video::whereHas('articles', function ($q) use ($article) {
            $q->where('articles.id', $article->id);
        })
            ->with(['relatedVideos' => fn($q) => $q
                ->where('activity', 1)
                ->where('locale', $locale)
                ->with(['images' => fn($q) => $q->orderBy('order')])
                ->orderBy('sort')
            ])
            ->get();

        // Собираем уникальные рекомендованные видео
        $recommendedVideos = $videosWithThisArticle
            ->flatMap(fn($video) => $video->relatedVideos)
            ->unique('id')
            ->values();

        return Inertia::render('Public/Default/Articles/Show', [
            'article' => array_merge(
                (new ArticleResource($article))->resolve(),
                ['already_liked' => $alreadyLiked]
            ),
            'leftArticles' => ArticleResource::collection($leftArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'recommendedArticles' => ArticleResource::collection($article->relatedArticles),
            'leftBanners' => BannerResource::collection($leftBanners),
            'rightBanners' => BannerResource::collection($rightBanners),
            'leftVideos' => VideoResource::collection($leftVideos),
            'rightVideos' => VideoResource::collection($rightVideos),
            'recommendedVideos' => VideoResource::collection($recommendedVideos),
        ]);
    }

    /**
     * Лайк статьи
     *
     * @param string $id
     * @return JsonResponse
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

        $alreadyLiked = $article->likes()->where('user_id', $user->id)->exists();

        if ($alreadyLiked) {
            return response()->json([
                'success' => false,
                'message' => 'Вы уже поставили лайк.',
                'likes'   => $article->likes()->count(),
            ]);
        }

        $article->likes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'success' => true,
            'likes'   => $article->likes()->count(),
        ]);
    }
}
