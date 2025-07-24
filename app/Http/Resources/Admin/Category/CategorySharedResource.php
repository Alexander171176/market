<?php

namespace App\Http\Resources\Admin\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

/**
 * Ресурс для передачи базовой информации о категории,
 * обычно используется для списков выбора (например, parent_id).
 */
class CategorySharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
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
            : null;

        // Получаем экземпляр модели
        $category = $this->resource;

        // Возвращаем только самые необходимые данные для идентификации и отображения в списке
        return [
            'id' => $category->id,
            'parent_id' => $category->parent_id,
            'sort' => $category->sort,
            'activity' => $category->activity,
            'locale' => $category->locale,
            'title' => $category->title,
            'url' => $category->url,
            'children' => CategoryResource::collection($this->whenLoaded('children')),
            // Можно добавить URL первого изображения (превью)
            'thumbnail_url' => $thumbnailUrl, // <--- Используем результат проверки
        ];
    }
}
