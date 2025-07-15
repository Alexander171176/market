<?php

namespace App\Http\Controllers\Admin\Component;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Throwable;

class ComponentController extends Controller
{
    protected array $editableDirectories = [
        'Index'              => 'js/Pages/Public/Default',
        'Articles'           => 'js/Pages/Public/Default/Articles',
        'Rubrics'            => 'js/Pages/Public/Default/Rubrics',
        'Tags'               => 'js/Pages/Public/Default/Tags',
        'Video'              => 'js/Pages/Public/Default/Videos',
        'Comp-Articles'     => 'js/Components/Public/Default/Article',
        'Comp-Rubrics'       => 'js/Components/Public/Default/Rubric',
        'Comp-Banners'       => 'js/Components/Public/Default/Banner',
        'ComponentsVideos'   => 'js/Components/Public/Default/Video',
        'Part'               => 'js/Components/Public/Default/Partials',
        'Partials'           => 'js/Partials/Default',
        'locales'            => 'js/locales',
    ];

    protected array $editableFiles = [
        'js/Layouts/DefaultLayout.vue' => 'js/Layouts/DefaultLayout.vue',
    ];

    public function index(): InertiaResponse
    {
        // TODO: Проверка прав $this->authorize('show-components', Component::class);

        $fileContents = $this->getEditableFilesContent();

        return Inertia::render('Admin/Components/Index', [
            'fileContents' => $fileContents,
        ]);
    }

    protected function getEditableFilesContent(): array
    {
        $allFilesData = [];

        foreach ($this->editableDirectories as $displayName => $relativePath) {
            $fullDirectoryPath = resource_path(ltrim($relativePath, '/'));
            $filesData = [];

            if (File::isDirectory($fullDirectoryPath)) {
                // Вместо GLOB_BRACE
                $vueFiles = File::glob($fullDirectoryPath . '/*.vue');
                $jsFiles  = File::glob($fullDirectoryPath . '/*.js');
                $files = array_merge($vueFiles ?: [], $jsFiles ?: []);

                foreach ($files as $fullFilePath) {
                    $fileKey = $this->getRelativePath($fullFilePath);
                    if ($fileKey && str_starts_with(realpath($fullFilePath), realpath($fullDirectoryPath))) {
                        try {
                            $filesData[$fileKey] = File::get($fullFilePath);
                        } catch (Throwable $e) {
                            Log::error("Ошибка чтения файла компонента: {$fileKey}", ['exception' => $e]);
                            $filesData[$fileKey] = "Ошибка чтения файла.";
                        }
                    }
                }
            }

            if (!empty($filesData)) {
                $allFilesData[$displayName] = $filesData;
            }
        }

        $singleFilesData = [];
        foreach ($this->editableFiles as $fileKey => $relativePath) {
            $fullFilePath = resource_path(ltrim($relativePath, '/'));
            if (File::isFile($fullFilePath) && $this->isPathAllowed($fullFilePath)) {
                try {
                    $singleFilesData[$fileKey] = File::get($fullFilePath);
                } catch (Throwable $e) {
                    Log::error("Ошибка чтения файла компонента: {$fileKey}", ['exception' => $e]);
                    $singleFilesData[$fileKey] = "Ошибка чтения файла.";
                }
            } else {
                $singleFilesData[$fileKey] = "Файл не найден или не разрешен.";
                Log::warning("Попытка доступа к неразрешенному файлу: {$fileKey}");
            }
        }

        if (!empty($singleFilesData)) {
            $allFilesData['Files'] = $singleFilesData;
        }

        return $allFilesData;
    }

    public function save(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('edit-components', Component::class);

        $validated = $request->validate([
            'fileName' => [
                'required',
                'string',
                Rule::in(array_keys($this->getAllAllowedFilePaths()))
            ],
            'fileContent' => 'nullable|string|max:5242880',
        ]);

        $fileKey = $validated['fileName'];
        $newContent = $validated['fileContent'] ?? '';
        $relativePath = $this->getAllAllowedFilePaths()[$fileKey] ?? null;
        $fullFilePath = $relativePath ? resource_path(ltrim($relativePath, '/')) : null;

        if (!$fullFilePath || !File::isWritable(dirname($fullFilePath)) || !$this->isPathAllowed($fullFilePath)) {
            Log::error("Попытка записи в неразрешенный или несуществующий файл", ['key' => $fileKey, 'path' => $fullFilePath]);
            return redirect()->route('admin.components.index')
                ->with('error', __('admin/controllers/components.flash_file_not_allowed'));
        }

        try {
            File::put($fullFilePath, $newContent, true);
            Log::info("Файл компонента успешно сохранен", ['path' => $fileKey]);
            return redirect()->route('admin.components.index')
                ->with('success', __('admin/controllers/components.flash_file_saved',
                    ['filename' => basename($fileKey)]));
        } catch (Throwable $e) {
            Log::error("Ошибка сохранения файла компонента: {$fileKey}", ['exception' => $e]);
            return redirect()->route('admin.components.index')
                ->with('error', __('admin/controllers/components.flash_file_save_error',
                    ['filename' => basename($fileKey)]));
        }
    }

    private function getAllAllowedFilePaths(): array
    {
        $allowed = $this->editableFiles;

        foreach ($this->editableDirectories as $relativePath) {
            $fullDirectoryPath = resource_path(ltrim($relativePath, '/'));
            if (File::isDirectory($fullDirectoryPath)) {
                $vueFiles = File::glob($fullDirectoryPath . '/*.vue');
                $jsFiles  = File::glob($fullDirectoryPath . '/*.js');
                $files = array_merge($vueFiles ?: [], $jsFiles ?: []);

                foreach ($files as $fullFilePath) {
                    $fileKey = $this->getRelativePath($fullFilePath);
                    if ($fileKey && str_starts_with(realpath($fullFilePath), realpath($fullDirectoryPath))) {
                        $allowed[$fileKey] = $fileKey;
                    }
                }
            }
        }

        return $allowed;
    }

    private function isPathAllowed(string $fullPath): bool
    {
        $realFullPath = realpath($fullPath);
        if ($realFullPath === false) return false;

        foreach ($this->editableDirectories as $relativePath) {
            $realAllowedDir = realpath(resource_path(ltrim($relativePath, '/')));
            if ($realAllowedDir !== false && str_starts_with($realFullPath, $realAllowedDir . DIRECTORY_SEPARATOR)) {
                return true;
            }
        }

        foreach ($this->editableFiles as $relativeFilePath) {
            $realAllowedFile = realpath(resource_path(ltrim($relativeFilePath, '/')));
            if ($realAllowedFile !== false && $realFullPath === $realAllowedFile) {
                return true;
            }
        }

        return false;
    }

    private function getRelativePath(string $fullPath): ?string
    {
        $resourcePath = realpath(resource_path());
        $realFullPath = realpath($fullPath);

        if ($resourcePath === false || $realFullPath === false) return null;

        if (str_starts_with($realFullPath, $resourcePath)) {
            return ltrim(str_replace($resourcePath, '', $realFullPath), DIRECTORY_SEPARATOR);
        }

        return null;
    }
}
