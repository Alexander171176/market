<?php

namespace App\Models\Admin\Banner;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Models\Admin\Banner\Banner; // Импортируем Banner

class BannerImage extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'banner_images';

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
     * Баннеры, к которым принадлежит это изображение.
     * Исправляем имя метода на banners() и описание.
     */
    public function banners(): BelongsToMany
    {
        // Имя таблицы 'banner_has_images' и ключи 'image_id', 'banner_id' - ВЕРНО
        return $this->belongsToMany(Banner::class, 'banner_has_images', 'image_id', 'banner_id');
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
            // ->withResponsiveImages() // Опционально
            ->performOnCollections('images');

        $this->addMediaConversion('thumb')
              ->width(150)
              ->height(150)
              ->performOnCollections('images');
    }

    /**
     * Аксессор для получения URL основного изображения.
     *
     * @return string|null
     */
    public function getImageUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images');
    }

    /**
     * Аксессор для получения URL WebP-конверсии.
     *
     * @return string|null
     */
    public function getWebpUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'webp');
    }

    /**
     * Аксессор для получения URL превью (если добавите конверсию 'thumb').
     */
    public function getThumbUrlAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'thumb');
    }
}
