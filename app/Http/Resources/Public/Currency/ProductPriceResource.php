<?php

namespace App\Http\Resources\Public\Currency;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPriceResource extends JsonResource
{
    /**
     * Ожидает массив вида:
     * [
     *   'price' => float,
     *   'old_price' => float|null,
     *   'currency' => Currency,
     *   'source' => 'cache'|'rate',
     *   'computed_at' => \Carbon\CarbonInterface
     * ]
     *
     * Передавай сюда результат CurrencyConverterService::priceFor()
     */
    public function toArray(Request $request): array
    {
        $cur = $this['currency'];

        return [
            'price'       => (float) $this['price'],
            'old_price'   => isset($this['old_price']) ? (float) $this['old_price'] : null,
            'currency'    => [
                'code'         => (string) $cur->code,
                'symbol'       => (string) ($cur->symbol ?? ''),
                'precision'    => (int) $cur->precision,
                'symbol_first' => (bool) $cur->symbol_first,
                'decimal_sep'  => (string) $cur->decimal_sep,
                'thousands_sep'=> (string) $cur->thousands_sep,
            ],
            'formatted'   => [
                'price'       => (string) $cur->formatAmount($this['price']),
                'old_price'   => isset($this['old_price']) ? (string) $cur->formatAmount($this['old_price']) : null,
            ],
            'source'      => (string) ($this['source'] ?? 'rate'),
            'computed_at' => method_exists($this['computed_at'], 'toISOString')
                ? $this['computed_at']->toISOString()
                : null,
        ];
    }
}
