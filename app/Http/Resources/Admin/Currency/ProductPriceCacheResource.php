<?php

namespace App\Http\Resources\Admin\Currency;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPriceCacheResource extends JsonResource
{
    /**
     * @property int $id
     * @property int $product_id
     * @property int $currency_id
     * @property float $price
     * @property float|null $old_price
     * @property int|null $source_rate_id
     * @property Carbon|null $computed_at
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => (int) $this->id,
            'product_id'    => (int) $this->product_id,
            'currency'      => new CurrencySelectResource($this->whenLoaded('currency')),
            'price'         => (float) $this->price,
            'old_price'     => $this->old_price !== null ? (float) $this->old_price : null,
            'source_rate_id'=> $this->source_rate_id ? (int) $this->source_rate_id : null,
            'computed_at'   => optional($this->computed_at)?->toISOString(),
            'created_at'    => optional($this->created_at)?->toISOString(),
            'updated_at'    => optional($this->updated_at)?->toISOString(),
        ];
    }
}
