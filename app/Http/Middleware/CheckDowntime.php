<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class CheckDowntime
{
    /**
     * Обработка входящего запроса.
     */
    public function handle(Request $request, Closure $next)
    {
        $downtime = config('site_settings.downtimeSite', 'false');

        if (
            $downtime === 'true' &&
            !$request->is('admin*') &&
            !$request->is(app()->getLocale() . '/admin*') &&
            !$request->is('dashboard') &&
            !$request->is(app()->getLocale() . '/dashboard') &&
            !$request->is('maintenance') &&
            !$request->is(app()->getLocale() . '/maintenance')
        ) {
            return redirect(LaravelLocalization::localizeURL('/maintenance'));
        }

        if ($downtime === 'false' && ($request->is('maintenance')
                || $request->is(app()->getLocale() . '/maintenance'))) {
            return redirect(LaravelLocalization::localizeURL('/'));
        }

        return $next($request);
    }
}
