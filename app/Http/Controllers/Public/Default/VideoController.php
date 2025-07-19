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
     * Страница всех видео
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $locale = app()->getLocale();
        $search = trim($request->input('search'));
        $currentPage = (int) $request->input('page_videos', 1);
        $perPage = 6;

        // Видео с пагинацией
        $query = Video::where('activity', true)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->withCount('likes')
            ->orderByDesc('created_at');

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $videosPaginator = $query->paginate($perPage, ['*'], 'page_videos', $currentPage);

        $videoIds = $videosPaginator->pluck('id')->toArray();
        $likedVideoIds = auth()->check()
            ? auth()->user()->videoLikes()->whereIn('video_id', $videoIds)->pluck('video_id')->toArray()
            : [];

        $videosWithLikes = $videosPaginator->getCollection()->map(function ($video) use ($likedVideoIds) {
            return array_merge(
                (new VideoResource($video))->resolve(),
                ['already_liked' => in_array($video->id, $likedVideoIds)]
            );
        });

        // Универсальный контент: статьи, баннеры, видео
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

        $allBanners = Banner::where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftBanners = $allBanners->where('left', true)->values();
        $rightBanners = $allBanners->where('right', true)->values();

        $allVideos = Video::where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftVideos = $allVideos->where('left', true)->values();
        $rightVideos = $allVideos->where('right', true)->values();

        return Inertia::render('Public/Default/Videos/Index', [
            'videos' => ['data' => $videosWithLikes],
            'pagination' => [
                'currentPage' => $videosPaginator->currentPage(),
                'lastPage'    => $videosPaginator->lastPage(),
                'perPage'     => $videosPaginator->perPage(),
                'total'       => $videosPaginator->total(),
            ],
            'filters' => ['search' => $search],
            'locale' => $locale,
            'leftArticles' => ArticleResource::collection($leftArticles),
            'rightArticles' => ArticleResource::collection($rightArticles),
            'leftBanners' => BannerResource::collection($leftBanners),
            'rightBanners' => BannerResource::collection($rightBanners),
            'leftVideos' => VideoResource::collection($leftVideos),
            'rightVideos' => VideoResource::collection($rightVideos),
        ]);
    }

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

        $video->increment('views');

        $alreadyLiked = auth()->check()
            ? $video->likes()->where('user_id', auth()->id())->exists()
            : false;

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

        $allBanners = Banner::where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftBanners = $allBanners->where('left', true)->values();
        $rightBanners = $allBanners->where('right', true)->values();

        $allVideos = Video::where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        $leftVideos = $allVideos->where('left', true)->values();
        $rightVideos = $allVideos->where('right', true)->values();

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
