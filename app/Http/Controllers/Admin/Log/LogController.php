<?php

namespace App\Http\Controllers\Admin\Log;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class LogController extends Controller
{
    /**
     * @var array|string[]
     */
    protected array $files = [
        'laravel' => 'logs/laravel.log',
        'nginx_access' => 'docker/logs/nginx/access.log',
        'nginx_error' => 'docker/logs/nginx/error.log',
    ];

    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('show-logs');

        $selected = $request->query('file', 'laravel'); // По умолчанию laravel.log

        $relativePath = $this->files[$selected] ?? $this->files['laravel'];
        $logPath = storage_path($relativePath);

        $logContent = File::exists($logPath) ? File::get($logPath) : 'Файл лога не найден.';

        return Inertia::render('Admin/Log/Index', [
            'log' => $logContent,
            'files' => array_keys($this->files),
            'selectedFile' => $selected,
        ]);
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function clear(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('clear-logs');

        $selected = $request->query('file', 'laravel');

        $relativePath = $this->files[$selected] ?? $this->files['laravel'];
        $logPath = storage_path($relativePath);

        if (File::exists($logPath)) {
            File::put($logPath, '');
        }

        return redirect()->route('admin.logs.index', ['file' => $selected])->with('success', 'Лог очищен.');
    }

    /**
     * @param Request $request
     * @return BinaryFileResponse|RedirectResponse
     */
    public function download(Request $request): BinaryFileResponse|RedirectResponse
    {
        $selected = $request->query('file', 'laravel');
        $relativePath = $this->files[$selected] ?? $this->files['laravel'];
        $logPath = storage_path($relativePath);

        if (File::exists($logPath)) {
            return response()->download($logPath, "{$selected}.log");
        }

        return redirect()->route('admin.logs.index')->with('error', 'Файл не найден.');
    }
}
