<?php

namespace App\Models\Admin\Product;

use App\Models\Admin\Comment\Comment;
use App\Models\Admin\ProductVariant\ProductVariant;
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
        // Имя сводной таблицы 'product_related' и ключи - ВЕРНО
        return $this->belongsToMany(self::class,
            'product_related',
            'product_id',
            'related_product_id');
    }

    /** Связь: характеристики и значения */
    public function propertyValues(): BelongsToMany
    {
        return $this->belongsToMany(PropertyValue::class, 'product_property_value')
            ->withPivot('property_id')
            ->withTimestamps();
    }
}
