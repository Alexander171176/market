<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PhpInfoController extends Controller
{
    public function index(Request $request): Response
    {
        // abort_unless($request->user()?->hasRole('super-admin'), 403);
        // TODO: Проверка прав $this->authorize('show-systems');

        ob_start();
        phpinfo();
        $phpinfo = ob_get_clean();

        // Удалим <html>, <body> и прочее — оставим только содержимое
        $phpinfo = preg_replace('%^.*<body>(.*)</body>.*$%s', '$1', $phpinfo);

        return Inertia::render('Admin/Systems/PhpInfoPage', [
            'phpinfo' => $phpinfo
        ]);
    }
}
