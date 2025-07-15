<?php

namespace App\PathGenerators;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleImage;
use App\Models\Admin\Athlete\Athlete;
use App\Models\Admin\Athlete\AthleteImage;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Banner\BannerImage;
use App\Models\Admin\Tournament\Tournament;
use App\Models\Admin\Tournament\TournamentImage;
use App\Models\Admin\Video\Video;
use App\Models\Admin\Video\VideoImage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class CustomPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        // Если медиа привязано к сущности Article
        if ($media->model_type === Article::class) {
            return 'articles/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности ArticleImage
        if ($media->model_type === ArticleImage::class) {
            return 'article_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности Banner
        if ($media->model_type === Banner::class) {
            return 'banners/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности BannerImage
        if ($media->model_type === BannerImage::class) {
            return 'banner_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности Video ---
        if ($media->model_type === Video::class) {
            // Имя папки можно сделать таким же, как имя коллекции ('videos')
            return 'videos/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности VideoImage
        if ($media->model_type === VideoImage::class) {
            return 'video_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности Athlete ---
        if ($media->model_type === Athlete::class) {
            return 'athletes/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности AthleteImage
        if ($media->model_type === AthleteImage::class) {
            return 'athlete_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности Tournament ---
        if ($media->model_type === Tournament::class) {
            return 'tournaments/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности TournamentImage
        if ($media->model_type === TournamentImage::class) {
            return 'tournament_images/' . $media->model_id . '/';
        }


        // Дефолтный путь для остальных случаев
        return 'media/' . $media->model_id . '/';
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive/';
    }
}
