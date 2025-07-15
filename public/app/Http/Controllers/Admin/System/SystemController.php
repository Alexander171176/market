<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan; // <--- Импорт Artisan
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;     // <--- Импорт Redis
use Illuminate\Contracts\Redis\Connection; // <--- Для проверки соединения
use Throwable;                             // <--- Для обработки ошибок

class SystemController extends Controller
{
    /**
     * Очищает различные кэши приложения.
     */
    public function clearCache(): RedirectResponse
    {
        // TODO: Заменить на реальную проверку прав доступа, например:
        // $this->authorize('clear cache');
//        if (!auth()->user()?->can('manage system')) { // Пример проверки права
//            abort(403, 'У вас нет прав для очистки кэша.');
//        }

        $messages = []; // Собираем сообщения о результате

        try {
            // 1. Очистка кэша Laravel
            try {
                $success = Cache::flush();
                if ($success) {
                    $messages[] = 'Кэш приложения Laravel очищен.';
                    Log::info('Laravel cache flushed by user: ' . auth()->id());
                } else {
                    // Это странно, но может случиться с некоторыми драйверами
                    Log::warning('Cache::flush() returned false.');
                    $messages[] = 'Не удалось полностью очистить кэш приложения Laravel.';
                }
            } catch (Throwable $e) {
                Log::error('Error flushing Laravel cache: ' . $e->getMessage());
                $messages[] = 'Ошибка при очистке кэша приложения Laravel.';
            }

            // 2. Очистка Redis (ТОЛЬКО ЕСЛИ НЕОБХОДИМО И БЕЗОПАСНО)
            // Проверяем, используется ли Redis ВООБЩЕ
            $redisConfigured = false;
            try {
                // Пытаемся получить соединение, не вызывая ошибку, если Redis не настроен
                if (app()->has('redis') && Redis::connection() instanceof Connection) {
                    $redisConfigured = true;
                }
            } catch (Throwable $e) {
                Log::info('Redis connection not configured or available for flushing.');
            }

            // Если Redis настроен И является драйвером кэша по умолчанию (защита от случайной очистки)
            if ($redisConfigured && config('cache.default') === 'redis') {
                Log::warning('Attempting to flush Redis cache (flushdb/flushall) - ensure Redis is used ONLY for Laravel Cache!');
                try {
                    // Используем соединение, указанное для кэша, или default
                    $redisConnectionName = config('cache.stores.redis.connection', 'default');
                    // ПЫТАЕМСЯ ОЧИСТИТЬ ТОЛЬКО ТЕКУЩУЮ БАЗУ ДАННЫХ REDIS (безопаснее чем flushAll)
                    // Убедитесь, что в config/database.php для вашего redis connection указана нужная 'database' => env('REDIS_CACHE_DB', 1)
                    $connection = Redis::connection($redisConnectionName);
                    // $connection->flushdb(); // Очищает ТОЛЬКО ТЕКУЩУЮ выбранную БД Redis
                    // ИЛИ если вы ТОЧНО уверены:
                    $connection->flushAll(); // Очищает ВСЕ БД на сервере Redis! ОЧЕНЬ ОПАСНО!
                    $messages[] = 'Кэш Redis очищен (' . (isset($connection) && method_exists($connection, 'flushAll') ? 'flushAll' : 'flushdb') . ').'; // Уточняем команду
                    Log::info('Redis cache flushed by user: ' . auth()->id() . ' on connection: ' . $redisConnectionName);
                } catch (Throwable $e) {
                    Log::error('Failed to flush Redis cache: ' . $e->getMessage());
                    $messages[] = 'Ошибка при очистке кэша Redis.';
                }
            } elseif ($redisConfigured) {
                Log::info('Redis is configured but not the default cache driver. Laravel Cache::flush() should handle Redis cache with prefix. Skipping explicit Redis flush.');
                // $messages[] = 'Кэш Redis (с префиксом) очищен через Cache::flush().'; // Можно добавить
            }


            // 3. Очистка других кэшей Laravel
            try { Artisan::call('config:clear'); $messages[] = 'Кэш конфигурации очищен.'; } catch (Throwable $e) { Log::error('Error clearing config cache: '.$e->getMessage()); $messages[] = 'Ошибка очистки кэша конфигурации.'; }
            try { Artisan::call('route:clear'); $messages[] = 'Кэш маршрутов очищен.'; } catch (Throwable $e) { Log::error('Error clearing route cache: '.$e->getMessage()); $messages[] = 'Ошибка очистки кэша маршрутов.'; }
            try { Artisan::call('view:clear'); $messages[] = 'Кэш представлений очищен.'; } catch (Throwable $e) { Log::error('Error clearing view cache: '.$e->getMessage()); $messages[] = 'Ошибка очистки кэша представлений.'; }
            // try { Artisan::call('event:clear'); $messages[] = 'Кэш событий очищен.'; } catch (Throwable $e) { Log::error('Error clearing event cache: '.$e->getMessage()); $messages[] = 'Ошибка очистки кэша событий.'; }

            // Собираем итоговое сообщение
            $finalMessage = implode(' ', $messages);
            return back()->with('success', $finalMessage ?: 'Кэш успешно очищен!'); // Если сообщений нет

        } catch (Throwable $e) {
            // Общая ошибка процесса
            Log::critical('Critical error during cache clearing process: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->with('error', 'Произошла критическая ошибка при очистке кэша.');
        }
    }
}
