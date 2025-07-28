<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Tag\Tag;
use App\Models\Admin\Video\Video;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SitemapController extends Controller
{
    private string $file = 'sitemap.xml';

    /** Страница просмотра / генерации */
    public function index(): Response
    {
        $content = file_exists(public_path($this->file))
            ? file_get_contents(public_path($this->file))
            : '';

        return Inertia::render('Admin/Systems/SitemapPage', [
            'content' => $content,
        ]);
    }

    /** Сгенерировать и вернуть XML‑код */
    public function generate(): Response
    {
        $this->build();                       // создаём файл
        $xml = file_get_contents(public_path($this->file));

        return Inertia::render('Admin/Systems/SitemapPage', [
            'content' => $xml,
            'flash'   => ['success' => __('admin/controllers.system_xml_updated_success')],
        ]);
    }

    /** Скачивание */
    public function download(): BinaryFileResponse
    {
        abort_unless(file_exists(public_path($this->file)), 404);
        return response()->download(public_path($this->file));
    }

    /** Логика сборки (можно вызывать из scheduler) */
    private function build(): void
    {
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setLastModificationDate(Carbon::yesterday()));

        // Рубрики
        Rubric::where('activity', true)->each(function ($rubric) use ($sitemap) {
            $sitemap->add(
                Url::create(route('public.rubrics.show', $rubric->url))
                    ->setLastModificationDate($rubric->updated_at)
            );
        });

        // Статьи
        Article::where('activity', true)->each(function ($article) use ($sitemap) {
            $sitemap->add(
                Url::create(route('public.articles.show', $article->url))
                    ->setLastModificationDate($article->updated_at)
            );
        });

        // Теги
        Tag::where('activity', true)->each(function ($tag) use ($sitemap) {
            $sitemap->add(
                Url::create(route('public.tags.show', $tag->slug))
                    ->setLastModificationDate($tag->updated_at)
            );
        });

        // Видео
        Video::where('activity', true)->each(function ($video) use ($sitemap) {
            $sitemap->add(
                Url::create(route('public.videos.show', $video->url))
                    ->setLastModificationDate($video->updated_at)
            );
        });

        // добавляйте и   др. аналогично ↑

        // Сохраняем карту сайта
        $sitemap->writeToFile(public_path($this->file));
    }
}
