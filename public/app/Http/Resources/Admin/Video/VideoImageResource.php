<?php

namespace App\Http\Resources\Admin\Video;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Используем аксессоры модели для получения URL
        return [
            'id'         => $this->id,
            'order'      => $this->order, // integer
            'alt'        => $this->alt,
            'caption'    => $this->caption,

            // Используем аксессоры из модели VideoImage
            'url'        => $this->image_url, // Оригинал
            'webp_url'   => $this->webp_url,  // WebP версия
            'thumb_url'  => $this->thumb_url, // Thumbnail версия <-- Добавлено

            // Даты в стандартном формате ISO 8601
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            // Дополнительные свойства, если нужны
            'mime_type'  => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->mime_type),
            'size'       => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->size),
            'size_human' => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->humanReadableSize),
        ];
    }
}
