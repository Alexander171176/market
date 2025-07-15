<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Setting\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Страница показа конкретной статьи.
     */
    public function show(string $url): Response
    {
        // Получаем локаль напрямую из базы, без кэширования
        $locale = Setting::where('option', 'locale')->value('value') ?? 'ru';

        // Получаем статью напрямую без кэширования
        $article = Article::with([
            'images' => function ($query) {
                $query->orderBy('order', 'asc');
            },
            'tags',
            'relatedArticles' => function ($query) use ($locale) {
                $query->where('activity', 1)
                    ->where('locale', $locale);
            },
            'relatedArticles.images' => function ($query) {
                $query->orderBy('order', 'asc');
            }
        ])
            ->where('activity', 1)
            ->where('locale', $locale)
            ->where('url', $url)
            ->firstOrFail();

        // Обновляем количество просмотров (обновляем сразу, без кэширования)
        $article->increment('views');

        // Получаем статьи для левого сайдбара
        $leftArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('left', true)
            ->orderBy('sort', 'desc')
            ->with([
                'images' => function ($query) {
                    $query->orderBy('order', 'asc');
                },
                'tags'
            ])
            ->get();

        // Получаем статьи для правого сайдбара
        $rightArticles = Article::where('activity', 1)
            ->where('locale', $locale)
            ->where('right', true)
            ->orderBy('sort', 'desc')
            ->with([
                'images' => function ($query) {
                    $query->orderBy('order', 'asc');
                },
                'tags'
            ])
            ->get();

        // Получаем баннеры для левой колонки
        $leftBanners = Banner::where('activity', 1)
            ->where('left', true)
            ->orderBy('sort', 'desc')
            ->with([
                'images' => function ($query) {
                    $query->orderBy('order', 'asc');
                }
            ])
            ->get();

        // Получаем баннеры для правой колонки
        $rightBanners = Banner::where('activity', 1)
            ->where('right', true)
            ->orderBy('sort', 'desc')
            ->with([
                'images' => function ($query) {
                    $query->orderBy('order', 'asc');
                }
            ])
            ->get();

        return Inertia::render('Public/Default/Articles/Show', [
            'article'             => new ArticleResource($article),
            'leftArticles'        => ArticleResource::collection($leftArticles),
            'rightArticles'       => ArticleResource::collection($rightArticles),
            'recommendedArticles' => ArticleResource::collection($article->relatedArticles),
            'leftBanners'         => BannerResource::collection($leftBanners),
            'rightBanners'        => BannerResource::collection($rightBanners),
        ]);
    }

    /**
     * Лайк статьи
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(string $id): \Illuminate\Http\JsonResponse
    {
        $article = Article::findOrFail($id);
        $article->increment('likes');
        return response()->json([
            'success' => true,
            'likes'   => $article->likes,
        ]);
    }
}
