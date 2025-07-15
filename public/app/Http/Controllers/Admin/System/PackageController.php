<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(Request $request): Response
    {
        // abort_unless($request->user()?->hasRole('super-admin'), 403);
        // TODO: Проверка прав $this->authorize('show-systems');

        $path = base_path('package.json');

        if (!File::exists($path)) {
            abort(404, 'package.json not found');
        }

        $package = json_decode(File::get($path), true);

        return Inertia::render('Admin/Systems/PackageInfoPage', [
            'package' => $package
        ]);
    }
}

