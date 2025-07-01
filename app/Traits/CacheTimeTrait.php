<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait CacheTimeTrait
{
    /**
     * Получить время кэширования из конфигурации.
     *
     * @return int
     */
    protected function getCacheTime(): int
    {
        // Получаем значение из файла конфигурации, с fallback на 600 секунд, если значение не задано
        return config('cache.default_cache_time', 600);
    }

    /**
     * Очистка кэша по указанным тегам.
     *
     * @param array|null $tags Массив тегов для очистки
     * @return void
     */
    protected function clearCache(array $tags = null): void
    {
        if ($tags) {
            // Очищаем кэш по каждому указанному тегу
            foreach ($tags as $tag) {
                Cache::store('redis')->forget($tag);
            }
        } else {
            // Если теги не указаны, можно очищать общий кэш, если это необходимо
            Cache::store('redis')->flush();
        }
    }
}
