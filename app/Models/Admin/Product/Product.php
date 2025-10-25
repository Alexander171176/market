<?php

namespace App\Models\Admin\Product;

use App\Models\Admin\Category\Category;
use App\Models\Admin\Comment\Comment;
use App\Models\Admin\ProductVariant\ProductVariant;
use App\Models\Admin\Property\Property;
use App\Models\Admin\PropertyValue\PropertyValue;
use App\Models\User\Like\ProductLike;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    protected $fillable = [
        'sort',
        'activity',
        'left',
        'main',
        'right',
        'is_new',
        'is_hit',
        'is_sale',
        'img',
        'locale',
        'sku',
        'title',
        'url',
        'short',
        'description',
        'views',
        'quantity',
        'unit',
        'weight',
        'availability',
        'price',
        'old_price',
        'currency',
        'barcode',
        'meta_title',
        'meta_keywords',
        'meta_desc',
        'admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    // protected $hidden = [
    //     'created_at',
    //     'updated_at',
    // ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort'         => 'integer',
        'activity'     => 'boolean',
        'left'         => 'boolean',
        'main'         => 'boolean',
        'right'        => 'boolean',
        'is_new'       => 'boolean',
        'is_hit'       => 'boolean',
        'is_sale'      => 'boolean',
        'views'        => 'integer',
        'quantity'     => 'integer',
        'weight'       => 'integer',
        'price'        => 'decimal:2',
        'old_price'    => 'decimal:2',
        'locale'       => 'string',
        'sku'          => 'string',
        'title'        => 'string',
        'url'          => 'string',
        'short'        => 'string',
        'description'  => 'string',
        'unit'         => 'string',
        'availability' => 'string',
        'currency'     => 'string',
        'barcode'      => 'string',
        'meta_title'   => 'string',
        'meta_keywords'=> 'string',
        'meta_desc'    => 'string',
        'admin'        => 'string',
        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
    ];

    /**
     * Получить все комментарии для данного товара
     */
    public function comments(): MorphMany
    {
        // Первый аргумент - связанная модель Comment
        // Второй аргумент - имя полиморфной связи (должно совпадать с методом в Comment)
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * Связь: Товар - Изображения (многие ко многим через ProductImage)
     */
    public function images(): BelongsToMany
    {
        return $this->belongsToMany(ProductImage::class, 'product_has_images', 'product_id', 'image_id')
            ->withPivot('order')
            ->orderBy('product_has_images.order', 'asc');
    }

    /** Связь: варианты товара */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'product_id');
    }

    /**
     * Связь: Товар - Лайки (один ко многим)
     */
    public function likes(): HasMany
    {
        return $this->hasMany(ProductLike::class, 'product_id');
    }

    /**
     * Связь: Товар - Рекомендованные товары (самоссылочная)
     */
    public function relatedProducts(): BelongsToMany
    {
        return $this->belongsToMany(
            self::class,
            'product_related',
            'product_id',
            'related_product_id'
        );
    }

    /**
     * Связь: Товар - Категория
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'category_has_product',      // имя таблицы
            'product_id',                // внешний ключ этой модели
            'category_id'                // внешний ключ связанной модели
        );
    }

    /** Связь: характеристики */
    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(
            Property::class,
            'product_has_property',
            'product_id',
            'property_id'
        )->withTimestamps()
            ->withPivot('sort')
            ->orderBy('product_has_property.sort'); // опционально
    }
}
