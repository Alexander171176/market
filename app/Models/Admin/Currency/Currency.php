<?php

namespace App\Models\Admin\Currency;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        'sort',
        'code',
        'name',
        'symbol',
        'precision',
        'symbol_first',
        'thousands_sep',
        'decimal_sep',
        'activity',
        'is_default',
        'set_default_at',
    ];

    protected $casts = [
        'sort'         => 'integer',
        'precision'    => 'integer',
        'symbol_first' => 'boolean',
        'activity'     => 'boolean',
        'is_default'   => 'boolean',
        'set_default_at' => 'datetime',
    ];

    // --- Связи курсов
    public function baseRates(): HasMany
    {
        return $this->hasMany(CurrencyRate::class, 'base_currency_id');
    }
    public function quoteRates(): HasMany
    {
        return $this->hasMany(CurrencyRate::class, 'quote_currency_id');
    }

    // --- Кэш цен
    public function priceCaches(): HasMany
    {
        return $this->hasMany(ProductPriceCache::class, 'currency_id');
    }

    // --- Скоупы
    public function scopeActive($q)   {
        return $q->where('activity', true);
    }
    public function scopeDefault($q)  {
        return $q->where('is_default', true);
    }

    // --- Удобные методы
    public function formatAmount(float|int $amount): string
    {
        $formatted = number_format($amount, $this->precision, $this->decimal_sep, $this->thousands_sep);
        return $this->symbol_first
            ? "{$this->symbol}{$formatted}"
            : "{$formatted} {$this->symbol}";
    }
}
