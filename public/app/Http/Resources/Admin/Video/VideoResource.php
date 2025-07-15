<?php

namespace App\Http\Resources\Admin\Video;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Article\ArticleResource; // Предполагаем, что Shared здесь не нужен
use App\Http\Resources\Admin\Video\VideoImageResource;
// Используем Shared ресурс для связанных видео
use App\Http\Resources\Admin\Video\VideoSharedResource; // Импортируем Shared

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sort' => $this->sort,          // integer
            'activity' => $this->activity,  // boolean
            'left' => $this->left,          // boolean
            'main' => $this->main,          // boolean
            'right' => $this->right,         // boolean
            'locale' => $this->locale,
            'title' => $this->title,
            'url' => $this->url,
            'short' => $this->short,
            'description' => $this->description,
            'author' => $this->author,
            'published_at'  => $this->published_at?->format('Y-m-d'), // YYYY-MM-DD
            'duration' => $this->duration,      // integer
            'source_type' => $this->source_type,

            // --- ИСПОЛЬЗУЕМ АТРИБУТЫ/АКСЕССОРЫ МОДЕЛИ ---
            'video_url'        => $this->when(
                $this->getFirstMediaUrl('videos'),
                fn() => $this->getFirstMediaUrl('videos')
            ),
            'embed_url' => $this->embed_url, // Используем аксессор getEmbedUrlAttribute()
            'video_code' => $this->video_code, // Используем аксессор getVideoCodeAttribute()
            // --- КОНЕЦ ИСПОЛЬЗОВАНИЯ АТРИБУТОВ ---

            'external_video_id' => $this->external_video_id, // Можно оставить для информации
            'embed_code' => $this->embed_code, // для HTML кода
            'views' => $this->views,         // integer
            'likes' => $this->likes,         // integer
            'meta_title' => $this->meta_title,
            'meta_keywords' => $this->meta_keywords,
            'meta_desc' => $this->meta_desc,
            'created_at' => $this->created_at?->toIso8601String(), // ISO формат
            'updated_at' => $this->updated_at?->toIso8601String(), // ISO формат

            // --- Связи и счетчики ---
            'sections_count' => $this->whenCounted('sections'),
            'articles_count' => $this->whenCounted('articles'),
            'images_count'   => $this->whenCounted('images'),
            'likes_count'    => $this->whenCounted('likes'),

            'sections' => SectionResource::collection($this->whenLoaded('sections')),
            // Для связанных статей, возможно, нужен ArticleSharedResource? Зависит от контекста.
            'articles' => ArticleResource::collection($this->whenLoaded('articles')),
            'images'   => VideoImageResource::collection($this->whenLoaded('images')),
            // Используем VideoSharedResource для связанных видео
            'related_videos' => VideoSharedResource::collection($this->whenLoaded('relatedVideos')),

        ];
    }
}
