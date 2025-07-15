<?php

namespace App\Models\Admin\Banner;

use App\Models\Admin\Section\Section;
use App\Models\Admin\Banner\BannerImage; // <--- ДОБАВЛЕН ИМПОРТ
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache; // Для возможной очистки кэша баннеров
use Illuminate\Support\Facades\Log;

class Banner extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'banners';

    /**
     * The attributes that are mass assignable.
     * Переходим на $fillable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',
        'activity',
        'left',
        'right',
        'title',
        'link',
        'short',
        'comment',
        // 'locale', // Добавьте, если баннеры мультиязычные (согласно комментарию в миграции)
    ];

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
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
        'left' => 'boolean',
        'right' => 'boolean',
    ];

    // --- Связи ---

    /**
     * Секции, к которым принадлежит баннер.
     */
    public function sections(): BelongsToMany
    {
        // Связь определена правильно
        return $this->belongsToMany(Section::class, 'banner_has_section')
            ->orderBy('sort', 'asc'); // Опционально: сортировка секций
    }

    /**
     * Изображения, связанные с этим баннером.
     */
    public function images(): BelongsToMany
    {
        // Связь определена правильно
        // Добавляем withPivot и orderBy для сортировки изображений
        return $this->belongsToMany(BannerImage::class, 'banner_has_images', 'banner_id', 'image_id')
            ->withPivot('order') // Убедитесь, что поле 'order' есть в таблице banner_has_images
            ->orderBy('banner_has_images.order', 'asc');
    }

    // --- Конец связей ---


    /**
     * Опционально: Очистка кэша, связанного с баннерами.
     */
    protected static function booted(): void
    {
        static::saved(function (Banner $banner) {
            // TODO: Заменить 'banners_cache_key' на реальные ключи кэша
            // Cache::forget('left_banners');
            // Cache::forget('right_banners');
            Log::info("Banner saved, potentially clearing cache: " . $banner->title);
        });

        static::deleted(function (Banner $banner) {
            // TODO: Заменить 'banners_cache_key' на реальные ключи кэша
            // Cache::forget('left_banners');
            // Cache::forget('right_banners');
            Log::info("Banner deleted, potentially clearing cache: " . $banner->title);
        });
    }

    /**
     * Опционально: Метод для проверки активности баннера.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }

    // Можно добавить другие методы или аксессоры, например, для проверки показа слева/справа
    public function isLeft(): bool { return $this->left; }
    public function isRight(): bool { return $this->right; }

}
