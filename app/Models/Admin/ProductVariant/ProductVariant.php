<?php

namespace App\Models\Admin\ProductVariant;

use App\Models\Admin\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use HasFactory;

    /**
     * Название таблицы.
     *
     * @var string
     */
    protected $table = 'product_variants';

    /**
     * Разрешённые к массовому заполнению поля.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'sort',
        'activity',
        'img',
        'sku',
        'title',
        'short',
        'description',
        'quantity',
        'weight',
        'availability',
        'price',
        'old_price',
        'currency',
        'barcode',
        'options',
        'admin',
    ];

    /**
     * Приведение типов.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'activity'     => 'boolean',
        'sort'         => 'integer',
        'quantity'     => 'integer',
        'weight'       => 'integer',
        'price'        => 'decimal:2',
        'old_price'    => 'decimal:2',
        'options'      => 'array', // JSON поле
    ];

    /**
     * Связь: Вариант принадлежит товару.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
