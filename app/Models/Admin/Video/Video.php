<?php

namespace App\Models\Admin\Video;

use App\Models\Admin\Comment\Comment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Video\VideoImage;
use App\Models\User\Like\VideoLike;
use Illuminate\Support\Facades\Cache; // Для кэша
use Illuminate\Support\Facades\Log;

class Video extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'videos';

    /**
     * The attributes that are mass assignable.
     * Используем $fillable. Поле video_url убрано из миграции и здесь.
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
        'published_at',
        'duration',
        'source_type',
        'external_video_id', // Оставляем для YouTube/Vimeo/Code
        'embed_code', // для HTML кода
        'views',
        'likes', // Оставляем, если редактируется админом
        'meta_title',
        'meta_keywords',
        'meta_desc',
    ];
    // Если views и/или likes не должны меняться массово, уберите их.

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
     * Добавляем касты для всех нужных полей.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
        'left' => 'boolean',
        'main' => 'boolean',
        'right' => 'boolean',
        'published_at' => 'date', // Или 'datetime' в зависимости от типа колонки
        'duration' => 'integer',
        'views' => 'integer',
        'likes' => 'integer',
    ];

    /**
     * Регистрация медиа-коллекции для локального видеофайла.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('videos') // Коллекция для самого видеофайла
        ->singleFile();                // Одно видео на запись
    }

    // --- Связи (проверяем имена таблиц/ключей) ---

    public function sections(): BelongsToMany
    {
        // Имя 'section_has_video' - ВЕРНО (согласно вашей миграции)
        return $this->belongsToMany(Section::class, 'section_has_video', 'video_id', 'section_id') // Добавляем ключи явно для надежности
            ->orderBy('sort', 'asc'); // Опциональная сортировка
    }

    public function articles(): BelongsToMany
    {
        // Имя 'article_has_video' - ВЕРНО
        return $this->belongsToMany(Article::class, 'article_has_video', 'video_id', 'article_id') // Добавляем ключи явно
            ->orderBy('published_at', 'desc'); // Опциональная сортировка
    }

    // --- НОВАЯ ПОЛИМОРФНАЯ СВЯЗЬ ---
    /**
     * Получить все комментарии для данного видео.
     */
    public function comments(): MorphMany
    {
        // Первый аргумент - связанная модель Comment
        // Второй аргумент - имя полиморфной связи (должно совпадать с методом в Comment)
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * Связь: Видео - Лайки (один ко многим)
     */
    public function likes(): HasMany
    {
        // Имя внешнего ключа 'video_id' - ВЕРНО
        return $this->hasMany(VideoLike::class, 'video_id');
    }

    /**
     * Изображения (превью) для этого видео.
     */
    public function images(): BelongsToMany
    {
        // Имя таблицы 'video_has_images' и ключи - ВЕРНО
        // Добавляем withPivot и orderBy
        return $this->belongsToMany(VideoImage::class, 'video_has_images', 'video_id', 'image_id')
            ->withPivot('order')
            ->orderBy('video_has_images.order', 'asc');
    }

    /**
     * Рекомендованные видео для этого видео.
     */
    public function relatedVideos(): BelongsToMany
    {
        // Имя таблицы 'video_related' и ключи - ВЕРНО
        return $this->belongsToMany(self::class, 'video_related', 'video_id', 'related_video_id');
    }

    // --- Конец связей ---

    /**
     * Опционально: Очистка кэша, связанного с видео.
     */
    protected static function booted(): void
    {
        static::saved(function (Video $video) {
            // TODO: Заменить 'videos_cache_key' на реальные ключи кэша
            // Cache::forget('videos_list_' . $video->locale);
            // Cache::forget('video_' . $video->url . '_' . $video->locale);
            Log::info("Video saved, potentially clearing cache: " . $video->title);
        });

        static::deleted(function (Video $video) {
            // TODO: Заменить 'videos_cache_key' на реальные ключи кэша
            // Cache::forget('videos_list_' . $video->locale);
            // Cache::forget('video_' . $video->url . '_' . $video->locale);
            Log::info("Video deleted, potentially clearing cache: " . $video->title);
        });
    }

    /**
     * Аксессор для получения URL локального видеофайла из Spatie.
     *
     * @return string|null
     */
    public function getVideoUrlAttribute(): ?string
    {
        // Возвращаем URL только если тип 'local'
        if ($this->source_type === 'local') {
            return $this->getFirstMediaUrl('videos'); // Используем имя коллекции
        }
        // Для 'code' или других типов, где URL хранится в external_video_id (или другом поле)
        // можно вернуть его, или null, или специальную логику
        // if ($this->source_type === 'code') return $this->external_video_id;
        return null; // По умолчанию null для не-локальных
    }

    /**
     * Аксессор для генерации embed URL для YouTube/Vimeo.
     *
     * @return string|null
     */
    public function getEmbedUrlAttribute(): ?string
    {
        if ($this->source_type === 'youtube' && $this->external_video_id) {
            $id = $this->extractYouTubeId($this->external_video_id);
            return $id ? "https://www.youtube.com/embed/{$id}" : null;
        }
        if ($this->source_type === 'vimeo' && $this->external_video_id) {
            $id = $this->extractVimeoId($this->external_video_id);
            return $id ? "https://player.vimeo.com/video/{$id}" : null;
        }
        return null;
    }

    /**
     * Аксессор для получения HTML кода для вставки (для типа 'code').
     *
     * @return string|null
     */
    public function getVideoCodeAttribute(): ?string
    {
        if ($this->source_type === 'code') {
            return $this->external_video_id; // Предполагаем, что код хранится здесь
        }
        return null;
    }

    // Вспомогательные приватные методы для извлечения ID
    private function extractYouTubeId(string $url): ?string
    {
        $regex = '/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/';
        preg_match($regex, $url, $match);
        return $match[1] ?? null;
    }

    private function extractVimeoId(string $url): ?string
    {
        $regex = '/vimeo\.com\/(?:video\/)?(\d+)/';
        preg_match($regex, $url, $match);
        return $match[1] ?? null;
    }


    // Добавляем другие вспомогательные методы is*
    public function isActive(): bool { return $this->activity; }
    public function isLeft(): bool { return $this->left; }
    public function isMain(): bool { return $this->main; }
    public function isRight(): bool { return $this->right; }

}
