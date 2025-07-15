<?php

namespace App\Http\Resources\Admin\Banner;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Используем аксессоры модели BannerImage
        return [
            'id'         => $this->id,
            'order'      => $this->order, // integer
            'alt'        => $this->alt,
            'caption'    => $this->caption,

            // Используем аксессоры
            'url'        => $this->image_url,
            'webp_url'   => $this->webp_url,
            'thumb_url'  => $this->thumb_url, // <--- ДОБАВЛЕНО

            // Даты в ISO 8601
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            // Доп. свойства
            'mime_type'  => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->mime_type),
            'size'       => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->size),
            'size_human' => $this->whenLoaded('media', fn() => $this->getFirstMedia('images')?->humanReadableSize),
        ];
    }
}
