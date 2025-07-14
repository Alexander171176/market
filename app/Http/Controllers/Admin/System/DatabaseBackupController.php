<?php

namespace App\Http\Controllers\Admin\System;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\ResponseFactory;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class DatabaseBackupController extends Controller
{
    private const BACKUP_DIR = 'backups';

    /**
     * Страница Архивации и Восстановления
     *
     * @return Response|ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        $backups = collect(Storage::disk('local')->files(self::BACKUP_DIR))
            ->filter(fn($file) => str_starts_with(basename($file), 'backup_') && str_ends_with($file, '.sql'))
            ->map(fn($file) => [
                'name' => basename($file),
                'size' => Storage::size($file),
                'created' => Storage::lastModified($file),
            ])
            ->sortByDesc('created');

        return inertia('Admin/Systems/DatabaseBackup', [
            'backups' => $backups->values()->all(),
        ]);
    }

    /**
     * Создать бэкап
     *
     * @return RedirectResponse
     */
    public function create(): RedirectResponse
    {
        $filename = 'backup_' . now()->format('Y-m-d_H-i-s') . '.sql';
        $path = storage_path('app/' . self::BACKUP_DIR . "/{$filename}");

        $db = config('database.connections.mysql');

        $command = sprintf(
            'mysqldump -h%s -P%s -u%s --password=%s %s > %s',
            escapeshellarg($db['host']),
            escapeshellarg($db['port']),
            escapeshellarg($db['username']),
            escapeshellarg($db['password']),
            escapeshellarg($db['database']),
            escapeshellarg($path)
        );

        $process = new Process(['/bin/sh', '-c', $command]);
        $process->setTimeout(120);

        try {
            $process->mustRun();
        } catch (ProcessFailedException $e) {
            return back()->with('error', 'Ошибка при создании бэкапа: ' . $e->getMessage());
        }

        return back()->with('success', 'Бэкап успешно создан');
    }

    /**
     * Восстановить бэкап
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function restore(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|string',
        ]);

        // ---------- 1. Проверяем, что запрошенный файл существует
        $backupToRestore = storage_path('app/' . self::BACKUP_DIR . "/{$request->file}");
        if (! File::exists($backupToRestore)) {
            return back()->with('error', "Файл '{$request->file}' не найден");
        }

        // ---------- 2. Делаем safety‑dump текущей БД
        $db       = config('database.connections.mysql');
        $rollback = 'safety_' . now()->format('Y-m-d_H-i-s') . '_' . Str::random(4) . '.sql';
        $rollbackPath = storage_path('app/' . self::BACKUP_DIR . "/{$rollback}");

        $dumpCmd = sprintf(
            'mysqldump -h%s -P%s -u%s --password=%s %s > %s',
            escapeshellarg($db['host']),
            escapeshellarg($db['port']),
            escapeshellarg($db['username']),
            escapeshellarg($db['password']),
            escapeshellarg($db['database']),
            escapeshellarg($rollbackPath)
        );

        $dump = new Process(['/bin/sh', '-c', $dumpCmd]);
        $dump->setTimeout(120);

        try {
            $dump->mustRun();
        } catch (ProcessFailedException $e) {
            // safety‑dump не получился — лучше не продолжать
            return back()->with('error', 'Не удалось создать резервную копию перед восстановлением: '
                . $e->getMessage());
        }

        // ---------- 3. Пытаемся восстановить выбранный backup
        $restoreCmd = sprintf(
            'mysql -h%s -P%s -u%s --password=%s %s < %s',
            escapeshellarg($db['host']),
            escapeshellarg($db['port']),
            escapeshellarg($db['username']),
            escapeshellarg($db['password']),
            escapeshellarg($db['database']),
            escapeshellarg($backupToRestore)
        );

        $restore = new Process(['/bin/sh', '-c', $restoreCmd]);
        $restore->setTimeout(180);

        try {
            $restore->mustRun();

            // ---------- 4. Успех → сообщаем и оставляем safety‑dump «на всякий»
            return back()->with('success',
                "БД успешно восстановлена из '{$request->file}'. "
                . "Страховочный бэкап сохранён как '{$rollback}'");
        } catch (ProcessFailedException $e) {

            // ---------- 5. Восстановление упало → откатываемся
            $revertCmd = sprintf(
                'mysql -h%s -P%s -u%s --password=%s %s < %s',
                escapeshellarg($db['host']),
                escapeshellarg($db['port']),
                escapeshellarg($db['username']),
                escapeshellarg($db['password']),
                escapeshellarg($db['database']),
                escapeshellarg($rollbackPath)
            );

            (new Process(['/bin/sh', '-c', $revertCmd]))->run();

            return back()->with('error',
                "❌ Ошибка восстановления: {$e->getMessage()}. "
                . "База данных откатена до состояния перед восстановлением (файл '{$rollback}').");
        }
    }

    /**
     * Удалить бэкап
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function delete(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|string',
        ]);

        $path = storage_path('app/' . self::BACKUP_DIR . "/{$request->file}");

        if (!File::exists($path)) {
            return back()->with('error', 'Файл не найден');
        }

        File::delete($path);

        return back()->with('success', 'Бэкап успешно удалён');
    }

    /**
     * Список бэкапов
     *
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        $backups = collect(Storage::disk('local')->files(self::BACKUP_DIR))
            ->filter(fn($file) => str_starts_with(basename($file), 'backup_') && str_ends_with($file, '.sql'))
            ->map(fn($file) => [
                'name' => basename($file),
                'size' => Storage::size($file),
                'created' => Storage::lastModified($file),
            ])
            ->sortByDesc('created')
            ->values()
            ->all();

        return response()->json(['backups' => $backups]);
    }

    /**
     * Загрузить дамп на ПК
     *
     * @param string $filename
     * @return StreamedResponse|RedirectResponse
     */
    public function download(string $filename): StreamedResponse|RedirectResponse
    {
        $path = self::BACKUP_DIR . '/' . $filename;

        if (!Storage::disk('local')->exists($path)) {
            return back()->with('error', 'Файл не найден для загрузки.');
        }

        return Storage::disk('local')->download($path);
    }

}
