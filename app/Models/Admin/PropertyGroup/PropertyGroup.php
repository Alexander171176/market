<?php

namespace App\Models\Admin\PropertyGroup;

use App\Models\Admin\Property\Property;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PropertyGroup extends Model
{
    use HasFactory;

    protected $table = 'property_groups';

    protected $fillable = [
        'sort',
        'activity',
        'name',
    ];

    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
    ];

    /**
     * Связь: Группа имеет множество характеристик.
     */
    public function properties(): HasMany
    {
        return $this->hasMany(Property::class, 'property_group_id');
    }
}
