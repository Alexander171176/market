<?php

namespace App\Providers;

use App\Models\Admin\Setting\Setting;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        if (Schema::hasTable('settings')) {
            // Загружаем все настройки в виде массива: ключ - название опции, значение - значение настройки
            $settings = Setting::pluck('value', 'option')->toArray();

            // Если в настройках присутствует значение 'locale', устанавливаем его
            if (isset($settings['locale'])) {
                App::setLocale($settings['locale']);
            } else {
                App::setLocale(config('app.locale'));
            }

            // Сохраняем настройки в конфигурации приложения, чтобы они были доступны глобально
            config(['site_settings' => $settings]);

            // Если требуется, делимся настройками со всеми Inertia-компонентами
            Inertia::share([
                'siteSettings' => $settings,
                'locale' => App::getLocale(),
                'canLogin' => fn () => Route::has('login'),
                'canRegister' => fn () => Route::has('register'),
            ]);
        }
    }
}
