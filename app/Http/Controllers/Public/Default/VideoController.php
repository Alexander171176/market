<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Video\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    use HasPublicBlocksTrait;

    /**
     * Страница всех видео.
     */
    public function index(Request $request): Response
    {
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

        // Универсальные блоки
        $flaggedArticles = $this->getFlaggedArticles();
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        return Inertia::render('Public/Default/Videos/Index', [
            'videos' => ['data' => $videosWithLikes],
            'pagination' => [
                'currentPage' => $videosPaginator->currentPage(),
                'lastPage'    => $videosPaginator->lastPage(),
                'perPage'     => $videosPaginator->perPage(),
                'total'       => $videosPaginator->total(),
            ],
            'filters' => ['search' => $search],
            'locale' => app()->getLocale(),
            'leftArticles' => ArticleResource::collection($flaggedArticles['left']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),
            'leftBanners' => BannerResource::collection($banners['left']),
            'rightBanners' => BannerResource::collection($banners['right']),
            'leftVideos' => VideoResource::collection($videos['left']),
            'rightVideos' => VideoResource::collection($videos['right']),
        ]);
    }

    /**
     * Страница показа видео.
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

        // Универсальные блоки
        $flaggedArticles = $this->getFlaggedArticles();
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        return Inertia::render('Public/Default/Videos/Show', [
            'video' => array_merge(
                (new VideoResource($video))->resolve(),
                ['already_liked' => $alreadyLiked]
            ),
            'recommendedVideos' => VideoResource::collection($video->relatedVideos),
            'leftArticles' => ArticleResource::collection($flaggedArticles['left']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),
            'leftBanners' => BannerResource::collection($banners['left']),
            'rightBanners' => BannerResource::collection($banners['right']),
            'leftVideos' => VideoResource::collection($videos['left']),
            'rightVideos' => VideoResource::collection($videos['right']),
            'locale' => $locale,
        ]);
    }

    /**
     * Лайк видео.
     */
    public function like(string $id): JsonResponse
    {
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers.liked_auth_error'),
            ], 401);
        }

        $video = Video::findOrFail($id);
        $user = auth()->user();

        $alreadyLiked = $video->likes()->where('user_id', $user->id)->exists();

        if ($alreadyLiked) {
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers.liked_user_error'),
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
