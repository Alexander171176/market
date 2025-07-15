<?php

namespace App\Models\Admin\Video;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Admin\Video\Video; // Импортируем Video

class VideoImage extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'video_images';

    /**
     * The attributes that are mass assignable.
     * Убираем 'path'.
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
     *
     * @var array<string, string>
     */
    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Видео, к которым принадлежит это изображение.
     * Исправляем имя метода на videos().
     */
    public function videos(): BelongsToMany
    {
        // Имя таблицы 'video_has_images' и ключи 'image_id', 'video_id' - ВЕРНО
        return $this->belongsToMany(Video::class, 'video_has_images', 'image_id', 'video_id');
    }

    /**
     * Регистрация медиа-коллекций для превью видео.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images') // Используем имя 'images', как и в других Image моделях
        ->singleFile();
    }

    /**
     * Регистрация медиа-конверсий для превью видео.
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(80)
            // ->withResponsiveImages()
            ->performOnCollections('images'); // Применяем к коллекции 'images'

        $this->addMediaConversion('thumb')
              ->width(150)
              ->height(150)
              ->performOnCollections('images');
    }

    /**
     * Аксессор для URL основного изображения превью.
     */
    public function getImageUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images');
    }

    /**
     * Аксессор для URL WebP-версии превью.
     */
    public function getWebpUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'webp');
    }

    /**
     * Аксессор для URL превью ('thumb').
     */
    public function getThumbUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'thumb');
    }
}
