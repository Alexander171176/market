<?php

namespace App\Http\Resources\Admin\Banner;

use App\Http\Resources\Admin\Section\SectionResource;
// Исправляем импорт на правильный ресурс изображения баннера
use App\Http\Resources\Admin\Banner\BannerImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
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
            'sort'          => $this->sort,     // integer
            'activity'      => $this->activity, // boolean
            'left'          => $this->left,     // boolean
            'right'         => $this->right,    // boolean
            'title'         => $this->title,
            'link'          => $this->link,     // Ссылка баннера
            'short'         => $this->short,
            'comment'       => $this->comment,
            // 'locale'     => $this->locale,  // <--- Добавить, если баннеры стали мультиязычными

            // Даты в формате ISO 8601
            'created_at'    => $this->created_at?->toIso8601String(),
            'updated_at'    => $this->updated_at?->toIso8601String(),

            // --- Связи и счетчики ---
            'sections_count' => $this->whenCounted('sections'),
            'images_count'   => $this->whenCounted('images'),

            // Используем правильные ресурсы для связей
            'sections' => SectionResource::collection($this->whenLoaded('sections')),
            'images'   => BannerImageResource::collection($this->whenLoaded('images')), // <--- ИСПРАВЛЕНО
        ];
    }
}
