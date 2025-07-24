<?php

namespace App\Http\Resources\Admin\ProductVariant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Admin\PropertyValue\PropertyValueResource;
use App\Http\Resources\Admin\ProductVariant\ProductVariantImageResource;

class ProductVariantResource extends JsonResource
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
            'id'           => $this->id,
            'product_id'   => $this->product_id,
            'sort'         => $this->sort,
            'activity'     => $this->activity,
            'img'          => $this->img,
            'sku'          => $this->sku,
            'title'        => $this->title,
            'short'        => $this->short,
            'description'  => $this->description,
            'quantity'     => $this->quantity,
            'weight'       => $this->weight,
            'availability' => $this->availability,
            'price'        => $this->price,
            'old_price'    => $this->old_price,
            'currency'     => $this->currency,
            'barcode'      => $this->barcode,
            'options'      => $this->options,
            'admin'        => $this->admin,

            // Коллекции
            'images'         => ProductVariantImageResource::collection($this->whenLoaded('images')),
            'property_values' => PropertyValueResource::collection($this->whenLoaded('propertyValues')),
        ];
    }
}
