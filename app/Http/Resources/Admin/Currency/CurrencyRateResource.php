<?php

namespace App\Http\Resources\Admin\Currency;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyRateResource extends JsonResource
{
    /**
     * @property int $id
     * @property int $base_currency_id
     * @property int $quote_currency_id
     * @property float $rate
     * @property string|null $provider
     * @property bool $is_manual
     * @property Carbon|null $fetched_at
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => (int) $this->id,
            'rate'             => (float) $this->rate,
            'provider'         => (string) ($this->provider ?? ''),
            'is_manual'        => (bool) $this->is_manual,
            'fetched_at'       => optional($this->fetched_at)?->toISOString(),
            'created_at'       => optional($this->created_at)?->toISOString(),
            'updated_at'       => optional($this->updated_at)?->toISOString(),

            // Вложенные валюты лёгким ресурсом (удобно для таблиц/редактирования)
            'base_currency'    => new CurrencySelectResource($this->whenLoaded('base')),
            'quote_currency'   => new CurrencySelectResource($this->whenLoaded('quote')),

            // Полезная склейка для отображения
            'pair'             => $this->when(isset($this->pair), (string) $this->pair, function () {
                $base = $this->relationLoaded('base') ? $this->base?->code : $this->base_currency_id;
                $quote = $this->relationLoaded('quote') ? $this->quote?->code : $this->quote_currency_id;
                return "{$base}/{$quote}";
            }),
        ];
    }
}
