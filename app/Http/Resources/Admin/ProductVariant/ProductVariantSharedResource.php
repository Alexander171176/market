<?php

namespace App\Http\Resources\Admin\ProductVariant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantSharedResource extends JsonResource
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
            'id'        => $this->id,
            'title'     => $this->title,
            'sku'       => $this->sku,
            'price'     => $this->price,
            'currency'  => $this->currency,
            'activity'  => $this->activity,
            'quantity'  => $this->quantity,

            // Миниатюра или первое изображение (если загружены)
            'thumbnail_url' => $this->whenLoaded('images', function () {
                $first = $this->images->first();
                return $first?->thumb_url ?? null;
            }),
        ];
    }
}
