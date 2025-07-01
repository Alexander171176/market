<?php

namespace App\Models\Admin\Article;

use App\Models\Admin\Comment\Comment;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Tag\Tag;
use App\Models\Admin\Video\Video;
use App\Models\User\Like\ArticleLike;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache; // Для возможной очистки кэша
use Illuminate\Support\Facades\Log;

class Article extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'articles';

    /**
     * The attributes that are mass assignable.
     * Убеждаемся, что все поля из миграции (кроме ID и timestamps),
     * которые должны быть изменяемы через create/update, здесь перечислены.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',
        'activity',
        'left',
        'main',
        'right',
        'locale',
        'title',
        'url',
        'short',
        'description',
        'author',
        'published_at', // Добавлено поле даты публикации
        'views',        // Оставляем, если админ может их редактировать
        'likes',        // Оставляем, если админ может их редактировать
        'meta_title',
        'meta_keywords',
        'meta_desc',
    ];

    // Если views и likes НЕ должны меняться админом напрямую, уберите их из $fillable.

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
        'sort' => 'integer',
        'activity' => 'boolean',
        'left' => 'boolean',
        'main' => 'boolean',
        'right' => 'boolean',
        'published_at' => 'date', // Используем datetime, если в БД timestamp, или 'date' если date
        'views' => 'integer',
        'likes' => 'integer',
    ];

    // --- Связи (проверяем соответствие миграциям и именам) ---

    /**
     * Связь: Статья - Секции (многие ко многим)
     */
    public function sections(): BelongsToMany
    {
        // Имя сводной таблицы 'article_has_section' - ВЕРНО
        return $this->belongsToMany(Section::class, 'article_has_section');
    }

    /**
     * Связь: Статья - Теги (многие ко многим)
     */
    public function tags(): BelongsToMany
    {
        // Имя сводной таблицы 'article_has_tag' и ключи - ВЕРНО
        return $this->belongsToMany(Tag::class, 'article_has_tag', 'article_id', 'tag_id');
    }

    // --- НОВАЯ ПОЛИМОРФНАЯ СВЯЗЬ ---
    /**
     * Получить все комментарии для данной статьи.
     */
    public function comments(): MorphMany
    {
        // Первый аргумент - связанная модель Comment
        // Второй аргумент - имя полиморфной связи (должно совпадать с методом в Comment)
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * Связь: Статья - Лайки (один ко многим)
     */
    public function likes(): HasMany
    {
        // Имя внешнего ключа 'article_id' - ВЕРНО
        return $this->hasMany(ArticleLike::class, 'article_id');
    }

    /**
     * Связь: Статья - Изображения (многие ко многим через ArticleImage)
     */
    public function images(): BelongsToMany
    {
        // Имя сводной таблицы 'article_has_images' и ключи - ВЕРНО
        // Добавляем withPivot и orderBy, как обсуждали
        return $this->belongsToMany(ArticleImage::class, 'article_has_images', 'article_id', 'image_id')
            ->withPivot('order')
            ->orderBy('article_has_images.order', 'asc');
    }

    /**
     * Видео, привязанные к статье.
     */
    public function videos(): BelongsToMany
    {
        // Имя сводной таблицы 'article_has_video' и ключи - ВЕРНО
        return $this->belongsToMany(Video::class, 'article_has_video', 'article_id', 'video_id');
    }

    /**
     * Связь: Статья - Рекомендованные статьи (самоссылочная)
     */
    public function relatedArticles(): BelongsToMany
    {
        // Имя сводной таблицы 'article_related' и ключи - ВЕРНО
        return $this->belongsToMany(self::class, 'article_related', 'article_id', 'related_article_id');
    }

    // --- Конец связей ---

    /**
     * Опционально: Очистка кэша, связанного со статьями.
     */
    protected static function booted(): void
    {
        static::saved(function (Article $article) {
            // TODO: Заменить 'articles_cache_key' на реальные ключи кэша (например, для списков, конкретной статьи)
            // Cache::forget('articles_list_' . $article->locale);
            // Cache::forget('article_' . $article->url . '_' . $article->locale);
            Log::info("Article saved, potentially clearing cache: " . $article->title);
        });

        static::deleted(function (Article $article) {
            // TODO: Заменить 'articles_cache_key' на реальные ключи кэша
            // Cache::forget('articles_list_' . $article->locale);
            // Cache::forget('article_' . $article->url . '_' . $article->locale);
            Log::info("Article deleted, potentially clearing cache: " . $article->title);
        });
    }

    /**
     * Опционально: Метод для проверки активности статьи.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }

    // Можно добавить другие аксессоры или методы, если нужно
}
