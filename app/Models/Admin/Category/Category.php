<?php

namespace App\Models\Admin\Category;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder; // Импортируем Builder для скоупов

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'parent_id',
        'sort',
        'activity',
        'locale',
        'title',
        'url',
        'short',
        'description',
        'meta_title',
        'meta_keywords',
        'meta_desc',
    ];

    protected $casts = [
        'activity' => 'boolean',
        'sort' => 'integer',
        'views' => 'integer',
        'parent_id' => 'integer', // Можно и не кастовать, Eloquent справится
    ];

    /**
     * Родительская категория
     *
     * Get the parent category.
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        // Связь с той же моделью Category
        // foreignKey: 'parent_id', ownerKey: 'id' (по умолчанию)
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Дочерние категории
     *
     * Get the direct children categories, ordered by sort.
     * Важно: Эта связь выбирает дочерние элементы *без* учета локали родителя.
     * Фильтрация по локали должна происходить при запросе дерева.
     *
     * @return HasMany
     */
    public function children(): HasMany
    {
        // Связь с той же моделью Category
        // foreignKey: 'parent_id', localKey: 'id' (по умолчанию)
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort');
    }

    /**
     * Рекурсивная связь для загрузки всех дочерних элементов (опционально).
     * Используйте с осторожностью для глубоких деревьев из-за производительности.
     * Лучше использовать ->with('children', 'children.children', ...) или специализированные запросы.
     *
     * @return HasMany
     */
    public function childrenRecursive(): HasMany
    {
        return $this->children()->with('childrenRecursive');
    }

    // ------------------------------------------------------------------------
    // Scopes
    // ------------------------------------------------------------------------

    /**
     * Scope a query to only include categories of a given locale.
     *
     * @param Builder $query
     * @param string $locale
     * @return Builder
     */
    public function scopeByLocale(Builder $query, string $locale): Builder
    {
        return $query->where('locale', $locale);
    }

    /**
     * Scope a query to only include root categories (those without a parent).
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeRoot(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('activity', true);
    }

    // ------------------------------------------------------------------------
    // Other Methods (Optional)
    // ------------------------------------------------------------------------

    /**
     * Проверяет, является ли категория корневой.
     *
     * @return bool
     */
    public function isRoot(): bool
    {
        return is_null($this->parent_id);
    }

    /**
     * Проверяет, есть ли у категории дочерние элементы.
     * Полезно для отображения иконки "развернуть" в аккордеоне.
     *
     * @return bool
     */
    public function hasChildren(): bool
    {
        // Можно использовать exists() для производительности, если не нужны сами дети
        return $this->children()->exists();
        // Или, если дети уже загружены (через with('children'))
        // return $this->relationLoaded('children') && $this->children->isNotEmpty();
    }

}
