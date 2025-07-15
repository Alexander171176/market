<?php

namespace App\Models\Admin\Plugin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache; // Для возможной очистки кэша плагинов
use Illuminate\Support\Facades\Log;   // Для логирования

class Plugin extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'plugins';

    /**
     * The attributes that are mass assignable.
     * Переключаемся на $fillable для большей безопасности.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sort',
        'icon',
        'name',       // Убедитесь, что 'name' действительно можно менять массово
        'version',
        'code',       // 'code' обычно уникален и, возможно, не должен меняться массово после создания?
        'options',
        'description',
        'readme',
        'templates',
        'activity',
    ];

    // Если какие-то поля НЕ ДОЛЖНЫ меняться через update/create, уберите их из $fillable.
    // Например, 'name' и 'code' часто задаются один раз.

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
        'sort' => 'integer',      // Хотя unsignedInteger, кастим к integer
        'options' => 'array',     // Используем 'array' для JSON-поля, это синоним 'json'
        'activity' => 'boolean',
    ];

    /**
     * Опционально: Очистка кэша, связанного с плагинами.
     */
    protected static function booted(): void
    {
        static::saved(function (Plugin $plugin) {
            // TODO: Заменить 'active_plugins_cache_key' на реальный ключ кэша активных плагинов, если он есть
            // Cache::forget('active_plugins_cache_key');
            Log::info("Plugin saved, potentially clearing cache: " . $plugin->name);
        });

        static::deleted(function (Plugin $plugin) {
            // TODO: Заменить 'active_plugins_cache_key' на реальный ключ кэша активных плагинов, если он есть
            // Cache::forget('active_plugins_cache_key');
            Log::info("Plugin deleted, potentially clearing cache: " . $plugin->name);
        });
    }

    /**
     * Опционально: Метод для проверки активности плагина.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->activity;
    }

    /**
     * Опционально: Метод для получения конкретной опции плагина.
     *
     * @param string $key Ключ опции
     * @param mixed $default Значение по умолчанию
     * @return mixed
     */
    public function getOption(string $key, mixed $default = null): mixed
    {
        // Используем $this->options, т.к. поле 'options' кастуется в массив
        return $this->options[$key] ?? $default;
    }
}
