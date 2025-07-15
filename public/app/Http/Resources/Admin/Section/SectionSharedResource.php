<?php

namespace App\Http\Resources\Admin\Section;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionSharedResource extends JsonResource
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
            'sort'          => $this->sort,
            'activity'      => $this->activity, // Уже boolean
            'icon'          => $this->icon,
            'locale'        => $this->locale,
            'title'         => $this->title,
            // 'url'        => $this->section_url, // Добавить, если есть поле url и аксессор
            'short'         => $this->short,
            // Можно добавить количество статей, если это нужно в списках выбора
            // 'articles_count' => $this->whenCounted('articles'),
        ];
    }
}
