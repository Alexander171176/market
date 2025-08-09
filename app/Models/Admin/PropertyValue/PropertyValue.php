<?php

namespace App\Models\Admin\PropertyValue;

use App\Models\Admin\Product\Product;
use App\Models\Admin\Property\Property;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PropertyValue extends Model
{
    use HasFactory;

    /**
     * Название таблицы.
     *
     * @var string
     */
    protected $table = 'property_values';

    /**
     * Поля, разрешённые для массового заполнения.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'property_id',
        'sort',
        'activity',
        'name',
        'slug',
        'locale',
    ];

    /**
     * Приведение типов.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort' => 'integer',
        'activity'     => 'boolean',
    ];

    /**
     * Связь: Значение характеристики принадлежит характеристике.
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class, 'property_id');
    }

    /**
     * Связь: Значение характеристики принадлежит многим товарам.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_property_value')
            ->withPivot('property_id')
            ->withTimestamps();
    }
}
