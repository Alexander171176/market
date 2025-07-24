<?php

namespace App\PathGenerators;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleImage;
use App\Models\Admin\Athlete\Athlete;
use App\Models\Admin\Athlete\AthleteImage;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Banner\BannerImage;
use App\Models\Admin\Category\Category;
use App\Models\Admin\Category\CategoryImage;
use App\Models\Admin\Product\Product;
use App\Models\Admin\Product\ProductImage;
use App\Models\Admin\ProductVariant\ProductVariant;
use App\Models\Admin\ProductVariant\ProductVariantImage;
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

        // Если медиа привязано к сущности Category ---
        if ($media->model_type === Category::class) {
            return 'categories/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности CategoryImage
        if ($media->model_type === CategoryImage::class) {
            return 'category_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности Product ---
        if ($media->model_type === Product::class) {
            return 'products/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности ProductImage
        if ($media->model_type === ProductImage::class) {
            return 'product_images/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности ProductVariant ---
        if ($media->model_type === ProductVariant::class) {
            return 'product_variants/' . $media->model_id . '/';
        }

        // Если медиа привязано к сущности ProductVariantImage
        if ($media->model_type === ProductVariantImage::class) {
            return 'product_variant_images/' . $media->model_id . '/';
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
