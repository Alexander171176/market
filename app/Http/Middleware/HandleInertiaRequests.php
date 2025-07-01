<?php

namespace App\Http\Middleware;

use App\Http\Resources\Admin\Plugin\PluginSharedResource;
use App\Http\Resources\Admin\Setting\SettingSharedResource;
use App\Http\Resources\Admin\User\UserSharedResource;
use App\Models\Admin\Plugin\Plugin;
use App\Models\Admin\Setting\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = auth()->user();
        $settings = Setting::all(); // Получение всех настроек из базы данных
        $plugins = Plugin::all(); // Получение всех плагинов из базы данных

        return [
            ...parent::share($request),
            'plugins' => fn () => PluginSharedResource::collection($plugins)->toArray($request),
            'settings' => fn () => SettingSharedResource::collection($settings)->toArray($request),
            'user' => fn () => $user ? (new UserSharedResource($user))->toArray($request) : null,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'locale' => LaravelLocalization::getCurrentLocale(),

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info'    => fn () => $request->session()->get('info'),
                // Добавьте другие ключи flash, если используете
            ],
        ];
    }
}
