<?php

namespace App\Models\Admin\Setting;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings';

    protected $fillable = [
        'sort',
        'activity',
        'type',
        'option',
        'value',
        'constant',
        'category',
        'description',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = [
        'sort' => 'integer',
        'activity' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saved(function (Setting $setting) {
            Cache::forget('site_settings');
            Cache::forget('setting_' . $setting->option);
            Log::info("Настройки сохранены, кэш очищен: " . $setting->option);
        });

        static::deleted(function (Setting $setting) {
            Cache::forget('site_settings');
            Cache::forget('setting_' . $setting->option);
            Log::info("Настройка удалена, кэш очищен: " . $setting->option);
        });
    }
}
