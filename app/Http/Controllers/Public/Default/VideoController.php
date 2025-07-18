<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Video\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Страница показа видео
     */
    public function show(string $url): Response
    {
        $locale = app()->getLocale();

        $video = Video::where('url', $url)
            ->where('activity', 1)
            ->withCount('likes')
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'relatedVideos' => fn($q) => $q
                    ->where('activity', 1)
                    ->with(['images' => fn($q) => $q->orderBy('order')]),
            ])
            ->firstOrFail();

        // Увеличиваем счётчик просмотров
        $video->increment('views');

        // Получаем, лайкал ли пользователь
        $alreadyLiked = auth()->check()
            ? $video->likes()->where('user_id', auth()->id())->exists()
            : false;

        // Статьи в колонках
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

        // Баннеры в колонках
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

        return Inertia::render('Public/Default/Videos/Show', [
            'video' => array_merge(
                (new VideoResource($video))->resolve(),
                ['already_liked' => $alreadyLiked]
            ),
            'recommendedVideos' => VideoResource::collection($video->relatedVideos),
            'leftArticles' => ArticleResource::collection($leftArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'leftBanners' => BannerResource::collection($leftBanners),
            'rightBanners' => BannerResource::collection($rightBanners),
            'leftVideos' => VideoResource::collection($leftVideos),
            'rightVideos' => VideoResource::collection($rightVideos),
            'locale' => $locale,
        ]);
    }

    /**
     * Лайк видео
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

        $video = Video::findOrFail($id);
        $user = auth()->user();

        $alreadyLiked = $video->likes()->where('user_id', $user->id)->exists();

        if ($alreadyLiked) {
            return response()->json([
                'success' => false,
                'message' => 'Вы уже поставили лайк.',
                'likes'   => $video->likes()->count(),
            ]);
        }

        $video->likes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'success' => true,
            'likes'   => $video->likes()->count(),
        ]);
    }

}
