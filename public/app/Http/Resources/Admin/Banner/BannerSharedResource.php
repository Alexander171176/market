<?php

namespace App\Http\Resources\Admin\Banner;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

class BannerSharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * (Облегченная версия)
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Получаем первое изображение (если оно было загружено с with('images'))
        // или null, если не было загружено
        $firstImage = $this->whenLoaded('images', fn() => $this->resource->images->first());

        // Проверяем, не является ли $firstImage объектом MissingValue
        $thumbnailUrl = !($firstImage instanceof MissingValue) && $firstImage
            ? $firstImage->thumb_url // Получаем URL, если images загружены и не пусты
            : null;                 // null во всех остальных случаях

        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'activity'      => $this->activity, // boolean
            'link'          => $this->link,     // Ссылка может быть важна
            // 'locale'     => $this->locale,  // Добавить, если мультиязычные

            // URL первого превью
            'thumbnail_url' => $thumbnailUrl,
        ];
    }
}
