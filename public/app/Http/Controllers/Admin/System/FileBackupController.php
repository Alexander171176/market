<?php

namespace App\Http\Controllers\Admin\System;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Inertia\Inertia;

class FileBackupController extends Controller
{
    private const BACKUP_DIR = 'file_backups';
    private const SOURCE_DIR = 'public'; // можно заменить на `base_path()` если хотите архивировать всё

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Systems/FileBackup');
    }

    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        $archives = collect(Storage::disk('local')->files('file_backups'))
            ->filter(fn($file) => str_ends_with($file, '.zip'))
            ->map(fn($file) => [
                'name' => basename($file),
                'size' => Storage::size($file),
                'created' => Storage::lastModified($file),
            ])
            ->sortByDesc('created')
            ->values();

        return response()->json(['archives' => $archives]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $backupPath = storage_path('app/file_backups');
        $filename = 'site_backup_' . now()->format('Y-m-d_H-i-s') . '.zip';

        if (!File::exists($backupPath)) {
            File::makeDirectory($backupPath, 0755, true);
        }

        $zip = new \ZipArchive();
        $fullPath = $backupPath . '/' . $filename;

        if ($zip->open($fullPath, \ZipArchive::CREATE) === true) {
            $basePath = base_path();

            // Каталоги, которые нужно исключить
            $excludedDirs = ['vendor', 'node_modules', 'storage', 'tests', '.git'];

            $files = new \RecursiveIteratorIterator(
                new \RecursiveCallbackFilterIterator(
                    new \RecursiveDirectoryIterator($basePath, \FilesystemIterator::SKIP_DOTS),
                    function ($file, $key, $iterator) use ($excludedDirs) {
                        $filename = $file->getFilename();
                        $path = $file->getPathname();

                        // Исключаем скрытые и защищённые каталоги
                        if ($file->isDir()) {
                            foreach ($excludedDirs as $excluded) {
                                if (str_contains($path, DIRECTORY_SEPARATOR . $excluded)) {
                                    return false;
                                }
                            }
                        }

                        // Исключаем системные скрытые каталоги (# и .)
                        return !str_starts_with($filename, '.') && !str_starts_with($filename, '#');
                    }
                ),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = str_replace($basePath . DIRECTORY_SEPARATOR, '', $filePath);
                    $zip->addFile($filePath, $relativePath);
                }
            }

            $zip->close();

            return response()->json(['message' => 'Archive created']);
        }

        return response()->json(['message' => 'Failed to create archive'], 500);
    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function restore(Request $request): RedirectResponse
    {
        $request->validate(['file' => 'required|string']);
        $filename = $request->file;
        $zipPath = storage_path('app/' . self::BACKUP_DIR . '/' . $filename);
        $targetPath = base_path(self::SOURCE_DIR);

        if (!File::exists($zipPath)) {
            return back()->with('error', 'Файл не найден');
        }

        $command = sprintf(
            'unzip -o %s -d %s',
            escapeshellarg($zipPath),
            escapeshellarg($targetPath)
        );

        $process = new Process(['/bin/sh', '-c', $command]);
        $process->setTimeout(180);

        try {
            $process->mustRun();
        } catch (ProcessFailedException $e) {
            return back()->with('error', 'Ошибка при восстановлении файлов: ' . $e->getMessage());
        }

        return back()->with('success', 'Файлы успешно восстановлены');
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function delete(Request $request): RedirectResponse
    {
        $request->validate(['file' => 'required|string']);
        $path = storage_path('app/' . self::BACKUP_DIR . '/' . $request->file);

        if (!File::exists($path)) {
            return back()->with('error', 'Файл не найден');
        }

        File::delete($path);

        return back()->with('success', 'Архив удалён');
    }

    /**
     * @param string $file
     * @return BinaryFileResponse
     */
    public function download(string $file): BinaryFileResponse
    {
        $path = storage_path('app/' . self::BACKUP_DIR . '/' . $file);

        if (!File::exists($path)) {
            abort(404);
        }

        return response()->download($path);
    }
}
