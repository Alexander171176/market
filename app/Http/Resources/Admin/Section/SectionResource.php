<?php

namespace App\Http\Resources\Admin\Section;

use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Banner\BannerResource;
use App\Http\Resources\Admin\Rubric\RubricResource;
use App\Http\Resources\Admin\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
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
            'sort'          => $this->sort,         // Уже integer из $casts
            'activity'      => $this->activity,     // Уже boolean из $casts
            'icon'          => $this->icon,         // TODO: Рассмотреть accessor для URL иконки?
            'locale'        => $this->locale,
            'title'         => $this->title,
            // 'url'        => $this->section_url, // <--- Используем аксессор, если добавили url и аксессор в модель
            'short'         => $this->short,
            'description'   => $this->description, // <--- ДОБАВЛЕНО

            // Формат дат: выберите нужный
            'created_at'    => $this->created_at?->isoFormat('DD.MM.YYYY HH:mm'), // <--- ДОБАВЛЕНО
            'updated_at'    => $this->updated_at?->diffForHumans(), // <--- ДОБАВЛЕНО
            // 'created_at' => $this->created_at?->toIso8601String(),
            // 'updated_at' => $this->updated_at?->toIso8601String(),

            // --- Связанные данные ---
            // Включаем коллекции ресурсов, если они были загружены через with()
            'articles'      => ArticleResource::collection($this->whenLoaded('articles')),
            'banners'       => BannerResource::collection($this->whenLoaded('banners')),
            'videos'        => VideoResource::collection($this->whenLoaded('videos')),

            // --- Количество связанных данных ---
            // Используем whenCounted, если загружали через withCount() в контроллере
            'articles_count' => $this->whenCounted('articles'),
            'banners_count'  => $this->whenCounted('banners'),
            'videos_count'   => $this->whenCounted('videos'),

            // Альтернатива: подсчет из уже загруженной коллекции (менее эффективно, если нужны только счетчики)
            // 'articles_count' => $this->whenLoaded('articles', fn() => $this->resource->articles->count()),

            // Пример подсчета только АКТИВНЫХ статей (требует загрузки с условием или отдельного withCount)
            // 'active_articles_count' => $this->whenCounted('activeArticles'), // Если определен скоуп или связь activeArticles
            // ИЛИ если статьи уже загружены:
            // 'active_articles_count' => $this->whenLoaded('articles', fn() => $this->resource->articles->where('activity', true)->count()),

        ];
    }
}
