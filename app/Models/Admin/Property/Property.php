<?php

namespace App\Models\Admin\Property;

use App\Models\Admin\Category\Category;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Property extends Model
{
    use HasFactory;

    protected $table = 'properties';

    protected $fillable = [
        'property_group_id',
        'sort',
        'activity',
        'type',
        'locale',
        'name',
        'slug',
        'description',
        'all_categories',
        'is_filterable',
        'filter_type',
    ];

    protected $casts = [
        'sort'          => 'integer',
        'activity'      => 'boolean',
        'all_categories'=> 'boolean',
        'is_filterable' => 'boolean',
    ];

    /**
     * Характеристика принадлежит группе.
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(PropertyGroup::class, 'property_group_id');
    }

    /**
     * Значения характеристики (many-to-many через пивот).
     */
    public function values(): BelongsToMany
    {
        return $this->belongsToMany(
            PropertyValue::class,
            'property_has_property_value',   // имя пивот-таблицы с has
            'property_id',
            'property_value_id'
        )
            ->withPivot('sort')
            // безопасная сортировка по колонке пивота:
            ->orderBy('property_has_property_value.sort');
        // (если используешь Laravel 10.43+, можно ->orderByPivot('sort'))
    }

    /**
     * Характеристика принадлежит множеству категорий.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_property', 'property_id', 'category_id');
    }
}
