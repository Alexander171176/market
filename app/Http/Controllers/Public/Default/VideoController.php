<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Video\Video;
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
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'relatedVideos' => fn($q) => $q
                    ->where('activity', 1)
                    ->with(['images' => fn($q) => $q->orderBy('order')]),
            ])
            ->firstOrFail();


        // Увеличиваем счётчик просмотров
        $video->increment('views');

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

        return Inertia::render('Public/Default/Videos/Show', [
            'video' => new VideoResource($video),
            'recommendedVideos' => VideoResource::collection($video->relatedVideos),
            'leftArticles' => ArticleResource::collection($leftArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'leftBanners' => BannerResource::collection($leftBanners),
            'rightBanners' => BannerResource::collection($rightBanners),
            'locale' => $locale,
        ]);
    }
}
