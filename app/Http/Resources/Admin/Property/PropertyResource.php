<?php

namespace App\Http\Resources\Admin\Property;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Admin\PropertyValue\PropertyValueResource;
use App\Http\Resources\Admin\Category\CategorySharedResource;
use App\Http\Resources\Admin\PropertyGroup\PropertyGroupResource;

class PropertyResource extends JsonResource
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
            'id'              => $this->id,
            'property_group_id' => $this->property_group_id,
            'sort'            => $this->sort,
            'activity'        => $this->activity,
            'type'            => $this->type,
            'locale'          => $this->locale,
            'name'            => $this->name,
            'slug'            => $this->slug,
            'description'     => $this->description,
            'all_categories'  => $this->all_categories,
            'is_filterable'   => $this->is_filterable,
            'filter_type'     => $this->filter_type,

            // Связи
            'group'      => new PropertyGroupResource($this->whenLoaded('group')),
            'values'     => PropertyValueResource::collection($this->whenLoaded('values')),
            'categories' => CategorySharedResource::collection($this->whenLoaded('categories')),
        ];
    }
}
