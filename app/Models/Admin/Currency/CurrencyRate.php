<?php

namespace App\Models\Admin\Currency;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurrencyRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'base_currency_id','quote_currency_id','rate',
        'provider','is_manual','fetched_at',
    ];

    protected $casts = [
        'rate'       => 'float',
        'is_manual'  => 'bool',
        'fetched_at' => 'datetime',
    ];

    public function base(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'base_currency_id');
    }

    public function quote(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'quote_currency_id');
    }

    // последний по времени курс
    public function scopeLatestFirst($q) {
        return $q->orderByDesc('fetched_at')->orderByDesc('id');
    }

    // Удобный атрибут "пара"
    public function getPairAttribute(): string
    {
        return ($this->base?->code ?? 'BASE').'/'.($this->quote?->code ?? 'QUOTE');
    }
}
