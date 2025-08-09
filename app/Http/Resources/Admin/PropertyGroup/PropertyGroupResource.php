<?php

namespace App\Http\Resources\Admin\PropertyGroup;

use App\Http\Resources\Admin\Property\PropertyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyGroupResource extends JsonResource
{
    public function authorize(): bool
    {
        // TODO: Добавить проверку прав доступа
        return true;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'sort'     => $this->sort,
            'activity' => $this->activity,
            'locale'   => $this->locale,
            'name'     => $this->name,

            // Опционально: если загружены характеристики группы
            'properties' => PropertyResource::collection($this->whenLoaded('properties')),
        ];
    }
}
