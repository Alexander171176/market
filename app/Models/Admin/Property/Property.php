<?php

namespace App\Models\Admin\Property;

use App\Models\Admin\Category\Category;
use App\Models\Admin\PropertyGroup\PropertyGroup;
use App\Models\Admin\PropertyValue\PropertyValue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'name',
        'slug',
        'description',
        'all_categories',
        'is_filterable',
        'filter_type',
    ];

    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
        'all_categories' => 'boolean',
        'is_filterable' => 'boolean',
    ];

    /**
     * Связь: Характеристика принадлежит группе характеристик.
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(PropertyGroup::class, 'property_group_id');
    }

    /**
     * Связь: Характеристика имеет множество значений.
     */
    public function values(): HasMany
    {
        return $this->hasMany(PropertyValue::class, 'property_id');
    }

    /**
     * Связь: Характеристика принадлежит множеству категорий.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_property', 'property_id', 'category_id');
    }
}
