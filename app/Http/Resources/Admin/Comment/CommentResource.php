<?php

namespace App\Http\Resources\Admin\Comment; // Убедитесь, что неймспейс правильный

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// Импортируем ресурсы для возможных commentable типов
use App\Http\Resources\Admin\Article\ArticleSharedResource;
use App\Http\Resources\Admin\Video\VideoSharedResource;
use App\Http\Resources\Admin\User\UserSharedResource; // Используем Shared для пользователя

class CommentResource extends JsonResource
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
            'id' => $this->id,
            'user' => new UserSharedResource($this->whenLoaded('user')), // Используем Shared ресурс для пользователя
            'parent_id' => $this->parent_id,
            'content' => $this->content,
            'approved' => $this->approved, // boolean (из $casts)
            'activity' => $this->activity, // boolean (из $casts)
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),

            // Полиморфная связь "commentable"
            // Загружаем связанную модель (статью, видео и т.д.), если она была загружена через with('commentable')
            // и преобразуем ее соответствующим Shared ресурсом
            'commentable_type' => $this->commentable_type, // Тип родительской модели (App\Models\...)
            'commentable_id' => $this->commentable_id,     // ID родительской модели
            'commentable' => $this->whenLoaded('commentable', function () {
                // Определяем, какой ресурс использовать в зависимости от типа модели
                return match ($this->commentable_type) {
                    \App\Models\Admin\Article\Article::class => new ArticleSharedResource($this->resource->commentable),
                    \App\Models\Admin\Video\Video::class => new VideoSharedResource($this->resource->commentable),
                    // Добавьте другие типы моделей, которые могут быть комментируемыми
                    default => ['id' => $this->commentable_id, 'type' => class_basename($this->commentable_type)], // Возвращаем базовую информацию, если ресурс не найден
                };
            }),

            // Ответы (дочерние комментарии), используем рекурсивно этот же ресурс
            'replies' => CommentResource::collection($this->whenLoaded('replies')),
            'replies_count' => $this->whenCounted('replies'), // Счетчик ответов
        ];
    }
}
