<?php

namespace App\Http\Resources\Admin\PropertyValue;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Admin\Property\PropertyResource;

class PropertyValueResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'sort'       => $this->sort,
            'activity'   => $this->activity,
            'locale'     => $this->locale,
            'name'       => $this->name,
            'slug'       => $this->slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Порядок из пивота, если ресурс получен через связь Property->values()
            'pivot_sort' => $this->when(isset($this->pivot), fn () => $this->pivot->sort),

            // Если где-то нужно показать, к каким характеристикам привязан value
            'properties' => PropertyResource::collection($this->whenLoaded('properties')),
        ];
    }
}
