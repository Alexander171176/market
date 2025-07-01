<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class EnvController extends Controller
{
    public function index(Request $request): Response
    {
        // abort_unless($request->user()?->hasRole('super-admin'), 403);
        // TODO: Проверка прав $this->authorize('show-systems');

        $path = base_path('.env');

        if (!File::exists($path)) {
            abort(404, '.env file not found');
        }

        $lines = collect(explode("\n", File::get($path)))
            ->filter(fn($line) => trim($line) !== '' && !str_starts_with(trim($line), '#'))
            ->map(function ($line) {
                $parts = explode('=', $line, 2);
                return [
                    'key' => trim($parts[0]),
                    'value' => trim($parts[1] ?? '')
                ];
            })->values();

        return Inertia::render('Admin/Systems/EnvInfoPage', [
            'env' => $lines
        ]);
    }
}
