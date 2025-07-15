<?php

namespace App\Http\Resources\Admin\Rubric;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RubricSharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * (Пример: только ID, title, url и активность)
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'url'           => $this->url,
            'activity'      => $this->activity, // Уже boolean
            'locale'        => $this->locale,   // Локаль может быть важна для фильтрации
            'icon'          => $this->icon, // Возможно, иконка тоже нужна
        ];
    }
}
