<?php

namespace App\Http\Resources\Admin\Video;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

// Можно импортировать VideoImageResource, если нужно первое превью
// use App\Http\Resources\Admin\Video\VideoImageResource;

class VideoSharedResource extends JsonResource
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
            'locale'        => $this->locale,
            'title'         => $this->title,
            'url'           => $this->url,
            'activity'      => $this->activity, // boolean
            'source_type'   => $this->source_type,
            'published_at'  => $this->published_at?->format('Y-m-d'), // YYYY-MM-DD

            // URL или код в зависимости от типа
            'display_source' => match ($this->source_type) {
                'local' => $this->video_url, // Аксессор из модели
                'youtube', 'vimeo' => $this->embed_url, // Аксессор из модели
                'code' => $this->video_code, // Аксессор из модели
                'embed_code' => $this->embed_code, // для HTML кода
                default => null,
            },

            // Можно добавить URL первого изображения (превью)
            'thumbnail_url' => $thumbnailUrl, // <--- Используем результат проверки

            // 'sort'       => $this->sort,
            // 'short'      => $this->short,
        ];
    }
}
