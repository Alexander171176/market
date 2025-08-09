<?php

namespace App\Models\Admin\PropertyValue;

use App\Models\Admin\Product\Product;
use App\Models\Admin\Property\Property;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PropertyValue extends Model
{
    use HasFactory;

    protected $table = 'property_values';

    protected $fillable = [
        'sort',
        'activity',
        'name',
        'slug',
        'locale',
    ];

    protected $casts = [
        'sort'     => 'integer',
        'activity' => 'boolean',
    ];

    /**
     * Характеристики, к которым привязано это значение (many-to-many).
     */
    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(
            Property::class,
            'property_has_property_value',
            'property_value_id',
            'property_id'
        )->withPivot('sort');
    }

    /**
     * Товары, у которых установлено это значение.
     * (оставляем, как было; timestamps на пивоте не используем)
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(
            Product::class,
            'product_property_value',
            'property_value_id',
            'product_id'
        )->withPivot('property_id'); // без ->withTimestamps()
    }
}
