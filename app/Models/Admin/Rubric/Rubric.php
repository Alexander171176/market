<?php

namespace App\Models\Admin\Rubric;

use App\Models\Admin\Section\Section; // Убедитесь, что неймспейс правильный
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache; // Для возможной очистки кэша меню
use Illuminate\Support\Facades\Log;

class Rubric extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'rubrics';

    /**
     * The attributes that are mass assignable.
     * Переходим на $fillable и включаем все нужные поля из миграции.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',
        'activity',
        'icon',
        'locale',
        'title',
        'url',
        'short',
        'description', // Добавлено
        'views',       // Добавлено (если им можно управлять через create/update)
        'meta_title',
        'meta_keywords',
        'meta_desc',
    ];

    // Если views или другие поля не должны меняться массово, уберите их из $fillable.

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
        'views' => 'integer', // Каст для счетчика просмотров
    ];

    /**
     * Связь многие ко многим с моделью Section.
     * Используем правильное имя сводной таблицы.
     * Можно добавить сортировку секций по умолчанию, если нужно.
     */
    public function sections(): BelongsToMany
    {
        return $this->belongsToMany(Section::class, 'rubric_has_sections', 'rubric_id', 'section_id')
            ->orderBy('sort', 'asc'); // Опционально: сортировать секции по их полю sort
    }

    /**
     * Опционально: Очистка кэша, связанного с рубриками (например, меню).
     */
    protected static function booted(): void
    {
        static::saved(function (Rubric $rubric) {
            // TODO: Заменить 'menu_rubrics_cache_key' на реальный ключ кэша, если рубрики кэшируются для меню
            // Cache::forget('menu_rubrics_cache_key');
            Log::info("Rubric saved, potentially clearing menu cache: " . $rubric->title);
        });

        static::deleted(function (Rubric $rubric) {
            // TODO: Заменить 'menu_rubrics_cache_key' на реальный ключ кэша, если рубрики кэшируются для меню
            // Cache::forget('menu_rubrics_cache_key');
            Log::info("Rubric deleted, potentially clearing menu cache: " . $rubric->title);
        });
    }

    /**
     * Опционально: Метод для проверки активности рубрики.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }
}
