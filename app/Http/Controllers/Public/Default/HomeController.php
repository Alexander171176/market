<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Video\Video;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    /**
     * Главная старница
     *
     * @return Response
     */
    public function index(): Response
    {
        $locale = app()->getLocale();

        // 🧩 Секции с 4 последними статьями
        $sections = Section::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->orderBy('sort')
            ->get();

        foreach ($sections as $section) {
            $section->setRelation('articles', $section->articles()
                ->where('activity', 1)
                ->where('locale', $locale)
                ->with([
                    'images' => fn($q) => $q->orderBy('order'),
                    'tags',
                ])
                ->orderBy('published_at', 'desc')
                ->limit(4)
                ->get());
        }

        // 🔄 Статьи по флагам
        $allArticles = Article::query()
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where(function ($q) {
                $q->where('left', true)
                    ->orWhere('main', true)
                    ->orWhere('right', true);
            })
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
                'tags',
            ])
            ->orderBy('sort', 'desc')
            ->get();

        $leftArticles = $allArticles->where('left', true)->values();
        $mainArticles   = $allArticles->where('main', true)->take(4)->values();
        $rightArticles  = $allArticles->where('right', true)->values();

        // 🏁 Баннеры по флагам
        $allBanners = Banner::query()
            ->where('activity', 1)
            ->where(function ($q) {
                $q->where('left', true)
                    ->orWhere('right', true);
            })
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
            ])
            ->orderBy('sort', 'desc')
            ->get();

        $leftBanners = $allBanners->where('left', true)->values();
        $rightBanners  = $allBanners->where('right', true)->values();

        // 🎥 Видео по флагам
        $allVideos = Video::query()
            ->where('activity', 1)
            ->where(function ($q) {
                $q->where('left', true)
                    ->orWhere('main', true)
                    ->orWhere('right', true);
            })
            ->with([
                'images' => fn($q) => $q->orderBy('order'),
            ])
            ->orderBy('sort', 'desc')
            ->get();

        $leftVideos = $allVideos->where('left', true)->values();
        $mainVideos   = $allVideos->where('main', true)->take(4)->values();
        $rightVideos  = $allVideos->where('right', true)->values();

        return Inertia::render('Public/Default/Index', [
            'sections'              => SectionResource::collection($sections),
            'leftArticles'          => ArticleResource::collection($leftArticles),
            'mainArticles'          => ArticleResource::collection($mainArticles),
            'rightArticles'         => ArticleResource::collection($rightArticles),
            'leftBanners'           => BannerResource::collection($leftBanners),
            'rightBanners'          => BannerResource::collection($rightBanners),
            'leftVideos'            => VideoResource::collection($leftVideos),
            'mainVideos'            => VideoResource::collection($mainVideos),
            'rightVideos'           => VideoResource::collection($rightVideos),
        ]);
    }

}
