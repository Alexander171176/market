<?php

namespace App\Http\Resources\Admin\Plugin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PluginResource extends JsonResource
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
            'sort' => $this->sort,          // integer (из $casts)
            'icon' => $this->icon,          // TODO: Возможно, нужен аксессор для URL иконки?
            'name' => $this->name,
            'version' => $this->version,
            'code' => $this->code,
            // Поле 'options' уже будет PHP-массивом благодаря $casts['options' => 'array']
            // Ресурс автоматически сериализует его в JSON.
            'options' => $this->options,
            'description' => $this->description,
            'readme' => $this->readme,        // Возможно, readme не всегда нужно передавать?
            'templates' => $this->templates,   // Возможно, шаблоны не всегда нужно передавать?
            'activity' => $this->activity,    // boolean (из $casts)

            // Даты скрыты через $hidden в модели. Раскомментируйте, если они нужны.
            // 'created_at' => $this->created_at?->toIso8601String(),
            // 'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
