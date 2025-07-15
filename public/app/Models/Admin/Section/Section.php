<?php

namespace App\Models\Admin\Section;

use App\Models\Admin\Article\Article;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Video\Video;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;

// Для возможной очистки кэша
use Illuminate\Support\Facades\Log;

class Section extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sections';

    /**
     * The attributes that are mass assignable.
     * Добавляем 'description' и убираем $guarded.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',
        'activity',
        'icon',
        'locale',
        'title',
        // 'url', // Добавьте, если реализовали рекомендацию в миграции
        'short',
        'description', // Добавлено поле
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
    ];

    // --- Связи ---

    /**
     * Статьи, принадлежащие этой секции.
     */
    public function articles(): BelongsToMany
    {
        // Добавляем сортировку статей по их полю sort (опционально)
        return $this->belongsToMany(Article::class, 'article_has_section', 'section_id', 'article_id')->orderBy('sort', 'asc');
    }

    /**
     * Баннеры, принадлежащие этой секции.
     */
    public function banners(): BelongsToMany
    {
        // Добавляем сортировку баннеров по их полю sort (опционально)
        return $this->belongsToMany(Banner::class, 'banner_has_section')->orderBy('sort', 'asc');
    }

    /**
     * Видео, принадлежащие этой секции.
     */
    public function videos(): BelongsToMany
    {
        // Связь определена правильно
        // Добавляем сортировку видео по их полю sort (опционально)
        return $this->belongsToMany(Video::class, 'section_has_video', 'section_id', 'video_id')->orderBy('sort', 'asc');
    }

    // --- Конец связей ---

    /**
     * Опционально: Очистка кэша, связанного с секциями (например, для меню или списков).
     */
    protected static function booted(): void
    {
        static::saved(function (Section $section) {
            // TODO: Заменить 'sections_cache_key' на реальные ключи кэша
            // Cache::forget('sections_list_' . $section->locale);
            // Cache::forget('menu_structure'); // Если секции влияют на меню
            Log::info("Секция сохранена, что может привести к очистке кэша: " . $section->title);
        });

        static::deleted(function (Section $section) {
            // TODO: Заменить 'sections_cache_key' на реальные ключи кэша
            // Cache::forget('sections_list_' . $section->locale);
            // Cache::forget('menu_structure');
            Log::info("Секция удалена, что может привести к очистке кэша: " . $section->title);
        });
    }

    /**
     * Опционально: Метод для проверки активности секции.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }
}
