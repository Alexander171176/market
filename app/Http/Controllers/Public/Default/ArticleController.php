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

        $article = Article::withCount('likes')
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'tags',
                'relatedArticles' => fn($q) => $q
                    ->where('activity', 1)
                    ->where('locale', $locale),
                'relatedArticles.images' => fn($q) => $q->orderBy('order'),
            ])
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where('url', $url)
            ->firstOrFail();

        // Инкремент просмотров
        $article->increment('views');

        // Получаем, лайкал ли пользователь
        $alreadyLiked = auth()->check()
            ? $article->likes()->where('user_id', auth()->id())->exists()
            : false;

        // Статьи
        $leftArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('left', true)
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

        // Получаем все видео, в которых есть эта статья
        $videosWithThisArticle = Video::whereHas('articles', function ($q) use ($article) {
            $q->where('articles.id', $article->id);
        })->get();

        // Собираем рекомендованные видео со всех таких видео
        $recommendedVideos = collect();

        foreach ($videosWithThisArticle as $video) {
            $recommendedVideos = $recommendedVideos->merge(
                $video->relatedVideos()
                    ->where('activity', 1)
                    ->where('locale', $locale)
                    ->with(['images' => fn($q) => $q->orderBy('order')])
                    ->orderBy('sort')
                    ->get()
            );
        }

        // Удаляем дубликаты по id
        $recommendedVideos = $recommendedVideos->unique('id')->values();

        return Inertia::render('Public/Default/Articles/Show', [
            // ⬇️ Передаём уже лайкал ли пользователь в props
            'article'             => array_merge(
                (new ArticleResource($article))->resolve(),
                ['already_liked' => $alreadyLiked]
            ),
            'leftArticles'        => ArticleResource::collection($leftArticles),
            'rightArticles'       => ArticleResource::collection($rightArticles),
            'recommendedArticles' => ArticleResource::collection($article->relatedArticles),
            'leftBanners'         => BannerResource::collection($leftBanners),
            'rightBanners'        => BannerResource::collection($rightBanners),
            'leftVideos'          => VideoResource::collection($leftVideos),
            'rightVideos'         => VideoResource::collection($rightVideos),
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
