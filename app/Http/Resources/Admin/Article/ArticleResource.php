<?php

namespace App\Http\Resources\Admin\Article;

use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Tag\TagResource;
use App\Http\Resources\Admin\Video\VideoResource;
// Используем Shared ресурс для связанных статей во избежание рекурсии
use App\Http\Resources\Admin\Article\ArticleSharedResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'sort'          => $this->sort,
            'activity'      => $this->activity, // boolean
            'left'          => $this->left,     // boolean
            'main'          => $this->main,     // boolean
            'right'         => $this->right,    // boolean
            'locale'        => $this->locale,
            'title'         => $this->title,
            'url'           => $this->url,
            'short'         => $this->short,
            'description'   => $this->description,
            'author'        => $this->author,
            'published_at'  => $this->published_at?->format('Y-m-d'), // YYYY-MM-DD
            'views'         => $this->views,     // integer
            'likes'         => $this->likes,     // integer
            'meta_title'    => $this->meta_title,
            'meta_keywords' => $this->meta_keywords,
            'meta_desc'     => $this->meta_desc,
            'created_at'    => $this->created_at?->toIso8601String(), // <--- Изменен формат на ISO
            'updated_at'    => $this->updated_at?->toIso8601String(), // <--- Изменен формат на ISO

            // --- Связи и счетчики ---
            // Используем whenCounted для счетчиков (предполагает withCount в контроллере)
            'comments_count' => $this->whenCounted('comments'),
            'sections_count' => $this->whenCounted('sections'),
            'tags_count'     => $this->whenCounted('tags'),
            'images_count'   => $this->whenCounted('images'),
            'videos_count'   => $this->whenCounted('videos'),
            'likes_count'    => $this->whenCounted('likes'), // Если нужна связь HasMany для лайков

            // Включаем полные данные связей, только если они были загружены
            'sections' => SectionResource::collection($this->whenLoaded('sections')),
            'tags'     => TagResource::collection($this->whenLoaded('tags')),
            'images'   => ArticleImageResource::collection($this->whenLoaded('images')),
            'videos'   => VideoResource::collection($this->whenLoaded('videos')),
            // Используем ArticleSharedResource для связанных статей
            'related_articles' => ArticleSharedResource::collection($this->whenLoaded('relatedArticles')),

        ];
    }
}
