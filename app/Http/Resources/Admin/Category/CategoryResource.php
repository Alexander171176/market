<?php

namespace App\Http\Resources\Admin\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Используем $this->resource для доступа к экземпляру модели Category
        $category = $this->resource;

        return [
            'id' => $category->id,
            'parent_id' => $category->parent_id,
            'sort' => $category->sort,
            'activity' => $category->activity,
            'locale' => $category->locale,
            'title' => $category->title,
            'url' => $category->url,
            'short' => $category->short,
            // Полное описание может быть большим, но включим его для формы редактирования
            'description' => $category->description,
            'views' => $category->views,
            'meta_title' => $category->meta_title,
            'meta_keywords' => $category->meta_keywords,
            'meta_desc' => $category->meta_desc,
            'created_at' => $category->created_at?->isoFormat('DD.MM.YYYY HH:mm:ss'), // Пример форматирования
            'updated_at' => $category->updated_at?->isoFormat('DD.MM.YYYY HH:mm:ss'), // Пример форматирования

            // --- Ключевой момент: рекурсивное включение дочерних элементов ---
            // Мы используем `whenLoaded`, чтобы включить 'children' только если
            // эта связь была явно загружена в контроллере (через `with('children')`).
            // Это предотвращает проблемы N+1 запросов.
            // Мы применяем этот же ресурс (CategoryResource) к коллекции дочерних элементов.
            'children' => CategoryResource::collection($this->whenLoaded('children')),

            // --- Опционально: Флаг наличия дочерних элементов ---
            // Можно добавить флаг, который всегда будет присутствовать,
            // даже если 'children' не загружены. Полезно для UI (например, показать иконку >).
            // Используем `relationLoaded` для проверки и `hasChildren()` для расчета, если не загружено.
            // 'has_children' => $this->relationLoaded('children')
            //                      ? $this->children->isNotEmpty()
            //                      : $this->hasChildren(), // Помните, что hasChildren() может сделать доп. запрос exists()
            // Более простой вариант, если контроллер всегда загружает хотя бы первый уровень детей:
            // 'has_children' => $this->whenLoaded('children', fn() => $this->children->isNotEmpty()),
            // Самый надежный вариант часто - просто проверять children.length во фронтенде
        ];
    }
}
