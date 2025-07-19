<?php

namespace App\Http\Controllers\Public\Default;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Video\Video;

trait HasPublicBlocksTrait
{
    protected function getFlaggedArticles(?array $sectionIds = null): array
    {
        $query = Article::query()
            ->where('activity', 1)
            ->where('locale', app()->getLocale())
            ->where(function ($q) {
                $q->where('left', true)
                    ->orWhere('main', true)
                    ->orWhere('right', true);
            })
            ->with(['images' => fn($q) => $q->orderBy('order'), 'tags'])
            ->orderByDesc('sort');

        if ($sectionIds) {
            $query->whereHas('sections', fn($q) => $q
                ->whereIn('sections.id', $sectionIds)
                ->where('activity', 1)
                ->where('locale', app()->getLocale()));
        }

        $articles = $query->get();

        return [
            'left' => $articles->where('left', true)->take(4)->values(),
            'main' => $articles->where('main', true)->take(4)->values(),
            'right' => $articles->where('right', true)->take(4)->values(),
        ];
    }

    protected function getGroupedBanners(): array
    {
        $banners = Banner::query()
            ->where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        return [
            'left' => $banners->where('left', true)->values(),
            'right' => $banners->where('right', true)->values(),
        ];
    }

    protected function getGroupedVideos(): array
    {
        $videos = Video::query()
            ->where('activity', 1)
            ->with(['images' => fn($q) => $q->orderBy('order')])
            ->orderBy('sort')
            ->get();

        return [
            'left' => $videos->where('left', true)->values(),
            'main' => $videos->where('main', true)->values(),
            'right' => $videos->where('right', true)->values(),
        ];
    }
}
