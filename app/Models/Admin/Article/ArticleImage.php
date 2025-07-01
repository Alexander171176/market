<?php

namespace App\Models\Admin\Article;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Admin\Article\Article; // <-- Добавляем импорт Article

class ArticleImage extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'article_images';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order',
        'alt',
        'caption',
    ];

    /**
     * The attributes that should be cast.
     * <--- ДОБАВЛЯЕМ КАСТ ДЛЯ ORDER ---
     * @var array<string, string>
     */
    protected $casts = [
        'order' => 'integer',
    ];
    // <--- КОНЕЦ ДОБАВЛЕНИЯ ---

    /**
     * Статьи, к которым принадлежит это изображение.
     */
    public function articles(): BelongsToMany
    {
        // Параметры связи верны
        return $this->belongsToMany(Article::class, 'article_has_images', 'image_id', 'article_id');
    }

    /**
     * Регистрация медиа-коллекций.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->singleFile();
    }

    /**
     * Регистрация медиа-конверсий.
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(80)
            // ->withResponsiveImages() // Вы раскомментировали это в своем коде - OK
            ->performOnCollections('images');

        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(150)
            ->sharpen(10) // Добавили sharpen, как у VideoImage - OK
            ->performOnCollections('images');
    }

    // --- Аксессоры (остаются без изменений) ---
    public function getImageUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images');
    }

    public function getWebpUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'webp');
    }

    public function getThumbUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'thumb');
    }
    // --- Конец аксессоров ---

}
