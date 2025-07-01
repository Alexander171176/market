<?php

namespace App\Http\Resources\Admin\Rubric;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Admin\Section\SectionResource; // Импортируем ресурс секции

class RubricResource extends JsonResource
{
    /**
     * Преобразует ресурс в массив.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'sort'          => $this->sort,
            'activity'      => $this->activity, // Уже boolean благодаря $casts
            'icon'          => $this->icon,     // Можно добавить accessor в модели для полного URL, если иконки хранятся как файлы
            'locale'        => $this->locale,
            'title'         => $this->title,
            'url'           => $this->url,
            'short'         => $this->short,
            'description'   => $this->description, // <--- ДОБАВЛЕНО
            'views'         => $this->views,       // <--- ДОБАВЛЕНО (уже integer благодаря $casts)
            'meta_title'    => $this->meta_title,
            'meta_keywords' => $this->meta_keywords,
            'meta_desc'     => $this->meta_desc,

            // Формат дат: выбирайте наиболее подходящий
            'created_at'    => $this->created_at?->isoFormat('DD.MM.YYYY HH:mm'), // Пример локализованного формата для отображения
            'updated_at'    => $this->updated_at?->diffForHumans(), // Пример "N времени назад"
            // 'created_at' => $this->created_at?->toIso8601String(), // Для API/JS
            // 'updated_at' => $this->updated_at?->toIso8601String(), // Для API/JS

            // Связанные секции (используем их ресурс)
            'sections' => SectionResource::collection($this->whenLoaded('sections')), // <--- Используем SectionResource

            // Количество секций (если связь уже загружена, как в index методе с with())
            'sections_count' => $this->whenLoaded('sections', fn() => $this->resource->sections->count()), // this->resource->... для доступа к модели

        ];
    }
}
