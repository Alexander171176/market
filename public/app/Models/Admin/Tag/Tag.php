<?php

namespace App\Models\Admin\Tag;

use App\Models\Admin\Article\Article;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tags';

    /**
     * The attributes that are mass assignable.
     * Добавляем новые поля.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',         // Добавлено
        'activity',     // Добавлено
        'locale',
        'name',
        'slug',
        'short',
        'description',
        'views',        // Добавлено (если управляем через админку)
        'meta_title',
        'meta_keywords',
        'meta_desc',
    ];

    // Если views не должно меняться админом напрямую, уберите его из $fillable.

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        // Можно скрыть, если не нужно во внешних ответах
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     * Добавляем касты для новых полей.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
        'views' => 'integer',
    ];

    // --- Связи (без изменений) ---

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_has_tag', 'tag_id', 'article_id')
            ->orderBy('published_at', 'desc');
    }

    // --- Конец связей ---

    /**
     * Опционально: Очистка кэша, связанного с тегами.
     */
    protected static function booted(): void
    {
        static::saved(function (Tag $tag) {
            // TODO: Заменить 'tags_cache_key' на реальные ключи кэша
            // Cache::forget('tags_cloud_' . $tag->locale);
            Log::info("Tag saved, potentially clearing cache: " . $tag->name);
        });

        static::deleted(function (Tag $tag) {
            // TODO: Заменить 'tags_cache_key' на реальные ключи кэша
            // Cache::forget('tags_cloud_' . $tag->locale);
            Log::info("Tag deleted, potentially clearing cache: " . $tag->name);
        });

        // Опционально: Автоматическая генерация slug
        static::saving(function (Tag $tag) {
             if (empty($tag->slug) && !empty($tag->name)) {
                 $tag->slug = Str::slug($tag->name);
                 // TODO: Убедиться в уникальности slug в рамках локали
             }
         });
    }

    /**
     * Опционально: Метод для проверки активности тега.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }

    /**
     * Опционально: Аксессор для URL тега.
     */
//    public function getTagUrlAttribute(): string
//    {
//        return route('public.tags.show', ['slug' => $this->slug]);
//    }
}
