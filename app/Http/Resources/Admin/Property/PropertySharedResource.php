<?php

namespace App\Http\Resources\Admin\Property;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertySharedResource extends JsonResource
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
            'id'     => $this->id,
            'locale' => $this->locale,
            'name'   => $this->name,
            'slug'   => $this->slug,
            'type'   => $this->type,
            'sort'   => $this->sort,
            'activity' => $this->activity,
            'is_filterable' => $this->is_filterable,
        ];
    }
}
