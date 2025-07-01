<?php

namespace App\Http\Resources\Admin\Tag;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// Импортируем ресурс для статей (возможно, Shared)
use App\Http\Resources\Admin\Article\ArticleSharedResource;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'sort'          => $this->sort,     // <--- ДОБАВЛЕНО (integer)
            'activity'      => $this->activity, // <--- ДОБАВЛЕНО (boolean)
            'locale'        => $this->locale,
            'name'          => $this->name,
            'slug'          => $this->slug,
            'url'           => $this->tag_url, // <--- Используем аксессор из модели Tag
            'short'         => $this->short,
            'description'   => $this->description,
            'views'         => $this->views,    // <--- ДОБАВЛЕНО (integer)
            'meta_title'    => $this->meta_title,
            'meta_keywords' => $this->meta_keywords,
            'meta_desc'     => $this->meta_desc,

            // Даты в формате ISO 8601
            'created_at'    => $this->created_at?->toIso8601String(),
            'updated_at'    => $this->updated_at?->toIso8601String(),

            // --- Связи и счетчики ---
            'articles_count' => $this->whenCounted('articles'),

            // Используем ArticleSharedResource для связанных статей, чтобы избежать лишних данных
            'articles' => ArticleSharedResource::collection($this->whenLoaded('articles')),
        ];
    }
}
