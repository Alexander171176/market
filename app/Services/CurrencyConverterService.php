<?php

namespace App\Services;

use App\Models\Admin\Currency\Currency;
use App\Models\Admin\Currency\CurrencyRate;
use App\Models\Admin\Currency\ProductPriceCache;
use App\Models\Admin\Product\Product;
use Illuminate\Support\Facades\DB;

class CurrencyConverterService
{
    /**
     * Конвертирует цену товара в нужную валюту.
     * Сначала смотрит кэш product_price_caches, при необходимости — пересчитывает и кэширует.
     */
    public function priceFor(Product $product, string $targetCode): array
    {
        $target = Currency::where('code', $targetCode)->firstOrFail();
        $base   = Currency::where('code', $product->currency)->first(); // currency в продукте — строка кода

        if (!$base) {
            // если вдруг в товаре нет кода — используем валюту по умолчанию
            $base = Currency::default()->firstOrFail();
        }

        // 1) Проверяем кэш
        $cached = ProductPriceCache::with('currency')
            ->where('product_id', $product->id)
            ->where('currency_id', $target->id)
            ->first();

        if ($cached) {
            return [
                'price'     => $cached->price,
                'old_price' => $cached->old_price,
                'currency'  => $target,
                'source'    => 'cache',
                'computed_at' => $cached->computed_at,
            ];
        }

        // 2) Берем курс
        $rateModel = $this->resolveRate($base->id, $target->id);
        $rate = $rateModel?->rate ?? 1.0;

        // 3) Считаем
        $price     = round($product->price * $rate, $target->precision);
        $old_price = $product->old_price ? round($product->old_price * $rate, $target->precision) : null;

        // 4) Кэшируем
        $this->cachePrice($product->id, $target->id, $price, $old_price, $rateModel?->id);

        return [
            'price'     => $price,
            'old_price' => $old_price,
            'currency'  => $target,
            'source'    => 'rate',
            'computed_at' => now(),
        ];
    }

    /**
     * Находит лучший курс base->quote (прямой, обратный или через дефолтную валюту).
     */
    public function resolveRate(int $baseId, int $quoteId): ?CurrencyRate
    {
        if ($baseId === $quoteId) {
            // курс 1:1
            return new CurrencyRate([
                'base_currency_id' => $baseId,
                'quote_currency_id' => $quoteId,
                'rate' => 1.0,
                'provider' => 'synthetic',
                'is_manual' => true,
                'fetched_at' => now(),
            ]);
        }

        // Прямой курс
        $direct = CurrencyRate::where('base_currency_id', $baseId)
            ->where('quote_currency_id', $quoteId)
            ->latestFirst()
            ->first();

        if ($direct) return $direct;

        // Обратный курс (если есть, инвертируем через временную модель)
        $inverse = CurrencyRate::where('base_currency_id', $quoteId)
            ->where('quote_currency_id', $baseId)
            ->latestFirst()
            ->first();

        if ($inverse) {
            return tap(new CurrencyRate([
                'base_currency_id' => $baseId,
                'quote_currency_id' => $quoteId,
                'rate' => $inverse->rate > 0 ? 1 / $inverse->rate : 0,
                'provider' => 'inverse('.$inverse->id.')',
                'is_manual' => $inverse->is_manual,
                'fetched_at' => $inverse->fetched_at,
            ]), function ($m) use ($inverse) {
                $m->exists = false; // синтетический, не сохраняем
            });
        }

        // Через дефолтную валюту (base -> default -> quote)
        $default = Currency::default()->first();
        if ($default && $default->id !== $baseId && $default->id !== $quoteId) {
            $first  = $this->resolveRate($baseId, $default->id);
            $second = $this->resolveRate($default->id, $quoteId);
            if ($first && $second) {
                return new CurrencyRate([
                    'base_currency_id' => $baseId,
                    'quote_currency_id' => $quoteId,
                    'rate' => ($first->rate ?? 0) * ($second->rate ?? 0),
                    'provider' => 'via-default',
                    'is_manual' => false,
                    'fetched_at' => now(),
                ]);
            }
        }

        return null;
    }

    protected function cachePrice(
        int $productId,
        int $currencyId,
        float $price,
        ?float $oldPrice,
        ?int $rateId
    ): void {
        ProductPriceCache::updateOrCreate(
            ['product_id' => $productId, 'currency_id' => $currencyId],
            [
                'price'         => $price,
                'old_price'     => $oldPrice,
                'source_rate_id'=> $rateId,
                'computed_at'   => now(),
            ]
        );
    }

    /**
     * Инвалидация кэша по товару (например, при изменении цены/валюты товара).
     */
    public function dropProductCache(int $productId): void
    {
        ProductPriceCache::where('product_id', $productId)->delete();
    }
}
