<?php

namespace App\Models\Admin\Currency;

use App\Models\Admin\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductPriceCache extends Model
{
    use HasFactory;

    protected $table = 'product_price_caches'; // вы просили явное соответствие

    protected $fillable = [
        'product_id','currency_id','price','old_price',
        'source_rate_id','computed_at',
    ];

    protected $casts = [
        'price'       => 'float',
        'old_price'   => 'float',
        'computed_at' => 'datetime',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function rate(): BelongsTo
    {
        return $this->belongsTo(CurrencyRate::class, 'source_rate_id');
    }
}
