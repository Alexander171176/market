<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Models\Admin\Section\Section;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    use HasPublicBlocksTrait;

    /**
     * Главная страница
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
            $articles = $section->articles()
                ->where('activity', 1)
                ->where('locale', $locale)
                ->with([
                    'images' => fn($q) => $q->orderBy('order'),
                    'tags',
                ])
                ->get()
                ->sortByDesc('sort')  // вручную сортируем по sort
                ->values()             // сбрасываем ключи
                ->take(4);             // берём только первые 4 после сортировки

            $section->setRelation('articles', $articles);
        }

        // Универсальные блоки
        $flaggedArticles = $this->getFlaggedArticles();
        $banners = $this->getGroupedBanners();
        $videos = $this->getGroupedVideos();

        return Inertia::render('Public/Default/Index', [
            'sections'      => SectionResource::collection($sections),
            'leftArticles'  => ArticleResource::collection($flaggedArticles['left']),
            'mainArticles'  => ArticleResource::collection($flaggedArticles['main']),
            'rightArticles' => ArticleResource::collection($flaggedArticles['right']),
            'leftBanners'   => BannerResource::collection($banners['left']),
            'rightBanners'  => BannerResource::collection($banners['right']),
            'leftVideos'    => VideoResource::collection($videos['left']),
            'mainVideos'    => VideoResource::collection($videos['main']->take(4)),
            'rightVideos'   => VideoResource::collection($videos['right']),
        ]);
    }
}
