<?php

namespace App\Http\Controllers\Admin\Video;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateLeftRequest;
use App\Http\Requests\Admin\UpdateMainRequest;
use App\Http\Requests\Admin\UpdateRightRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Requests\Admin\Video\VideoRequest; // Используем

// Реквесты для простых действий
use App\Http\Requests\Admin\UpdateActivityRequest;

// Ресурсы
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Video\VideoResource;
use App\Http\Resources\Admin\Video\VideoImageResource; // Для edit
use App\Http\Resources\Admin\Video\VideoSharedResource; // Для related_videos
use App\Http\Resources\Admin\Section\SectionResource; // Для списков
use App\Http\Resources\Admin\Article\ArticleSharedResource; // Для списков
// Модели
use App\Models\Admin\Video\Video;
use App\Models\Admin\Video\VideoImage;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Article\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request; // Для bulkDestroy
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;
use Illuminate\Http\UploadedFile; // Для проверки типа файла

/**
 * Контроллер для управления Видео в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Video\Video Модель Статьи
 * @see \App\Http\Requests\Admin\Video\VideoRequest Запрос для создания/обновления
 */
class VideoController extends Controller
{
    /**
     * Отображение списка всех Видео.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('view-video', Video::class);

        $adminCountVideos = config('site_settings.AdminCountVideos', 15);
        $adminSortVideos  = config('site_settings.AdminSortVideos', 'idDesc');

        try {
            $videos = Video::withCount(['sections', 'articles', 'images', 'comments', 'likes'])
                ->with(['images', 'sections', 'articles'])
                ->get();
            $videosCount = $videos->count();

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки видео для Index: " . $e->getMessage());
            $videos = collect(); // Пустая коллекция в случае ошибки
            $videosCount = 0;
            session()->flash('error', __('admin/controllers/videos.index_error'));
        }

        return Inertia::render('Admin/Videos/Index', [
            'videos' => VideoResource::collection($videos),
            'videosCount' => $videosCount,
            'adminCountVideos' => (int)$adminCountVideos,
            'adminSortVideos' => $adminSortVideos,
        ]);
    }

    /**
     * Отображение формы создания нового видео.
     * Передает список рубрик, статей, видео для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-video', Video::class);

        $sections = Section::select('id', 'title')->orderBy('title')->get();
        $articles = Article::select('id', 'title')->orderBy('title')->get(); // Для привязки статей
        $allVideos = Video::select('id', 'title')->orderBy('title')->get(); // Для related

        return Inertia::render('Admin/Videos/Create', [
            'sections' => SectionResource::collection($sections),
            'articles' => ArticleSharedResource::collection($articles), // Используем Shared
            'related_videos' => VideoSharedResource::collection($allVideos), // Используем Shared
        ]);
    }

    /**
     * Создание видео.
     */
    public function store(VideoRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $imagesData   = $data['images'] ?? [];
        $sectionIds   = collect($data['sections'] ?? [])->pluck('id')->toArray();
        $articleIds   = collect($data['articles'] ?? [])->pluck('id')->toArray();
        $relatedIds   = collect($data['related_videos'] ?? [])->pluck('id')->toArray();
        unset($data['images'], $data['sections'], $data['articles'], $data['related_videos']);

        try {
            DB::beginTransaction();
            $video = Video::create($data);

            // Если источник — локальный и файл пришёл
            if ($data['source_type'] === 'local' && $request->hasFile('video_file')) {
                // помещаем файл в коллекцию, например, 'videos'
                $video
                    ->addMediaFromRequest('video_file')
                    ->toMediaCollection('videos');
            }

            // Связи
            $video->sections()->sync($sectionIds);
            $video->articles()->sync($articleIds);
            $video->relatedVideos()->sync($relatedIds);

            // Обработка изображений
            $imageSyncData = [];
            $imageIndex    = 0;
            foreach ($imagesData as $imageData) {
                $fileKey = "images.{$imageIndex}.file";

                if ($request->hasFile($fileKey)) {
                    // Сначала создаём запись
                    $image = VideoImage::create([
                        'order'   => $imageData['order']   ?? 0,
                        'alt'     => $imageData['alt']     ?? '',
                        'caption' => $imageData['caption'] ?? '',
                    ]);

                    try {
                        $file = $request->file($fileKey);

                        if ($file->isValid()) {
                            $media = $image
                                ->addMedia($file)
                                ->toMediaCollection('images');

                            $imageSyncData[$image->id] = ['order' => $image->order];
                        } else {
                            Log::warning("Недопустимый файл изображения с индексом {$imageIndex} для видео {$video->id}", [
                                'fileKey' => $fileKey,
                                'error'   => $file->getErrorMessage(),
                            ]);
                            // Откатили создание VideoImage
                            $image->delete();
                            continue;
                        }
                    } catch (Throwable $e) {
                        Log::error("Ошибка Spatie media-library в видео {$video->id}, индекс изображения - {$imageIndex}: {$e->getMessage()}", [
                            'trace' => $e->getTraceAsString(),
                        ]);
                        // Откатили создание VideoImage
                        $image->delete();
                        continue;
                    }
                }

                $imageIndex++;
            }

            $video->images()->sync($imageSyncData);
            DB::commit();

            Log::info('Видео успешно создано', ['id' => $video->id, 'title' => $video->title]);
            return redirect()->route('admin.videos.index')->with('success', __('admin/controllers/videos.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании видео: {$e->getMessage()}", ['trace' => $e->getTraceAsString(),]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/videos.create_error')]);
        }
    }

    /**
     * Отображение формы редактирования существующего видео.
     * Использует Route Model Binding для получения модели.
     *
     * @param Video $video Модель видео, найденное по ID из маршрута.
     * @return Response
     */
    public function edit(Video $video): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('update-article', $article);

        // Загружаем все необходимые связи
        $video->load(['sections', 'articles', 'images' => fn($q) => $q->orderBy('order', 'asc'), 'relatedVideos']);

        // получаем URL первого (и единственного) файла из коллекции 'videos'
        $videoUrl = $video->getFirstMediaUrl('videos') ?: null;

        // Загружаем данные для селектов
        $sections = Section::select('id', 'title')->orderBy('title')->get();
        $articles = Article::select('id', 'title')->orderBy('title')->get();
        $allVideos = Video::where('id', '<>', $video->id)->select('id', 'title')->orderBy('title')->get(); // Исключаем текущую

        return Inertia::render('Admin/Videos/Edit', [
            'video' => new VideoResource($video),
            'video_url'  => $videoUrl,
            'sections' => SectionResource::collection($sections),
            'articles' => ArticleResource::collection($articles),
            'related_videos' => VideoSharedResource::collection(
                Video::where('id','<>',$video->id)->select('id','title')->get()
            ),
        ]);
    }

    /**
     * Обновление существующего видео в базе данных.
     * Использует VideoRequest и Route Model Binding.
     * Синхронизирует связанные изображения, секции, статьи, видео если они переданы.
     *
     * @param VideoRequest $request Валидированный запрос.
     * @param Video $video Модель видеои для обновления.
     * @return RedirectResponse Редирект на список видео с сообщением.
     */
    public function update(VideoRequest $request, Video $video): RedirectResponse // Используем RMB
    {
        $data = $request->validated();

        // Извлекаем все данные
        $imagesData       = $data['images'] ?? [];
        $deletedImageIds  = $data['deletedImages'] ?? [];
        $sectionIds       = collect($data['sections'] ?? [])->pluck('id')->toArray();
        $articleIds       = collect($data['articles'] ?? [])->pluck('id')->toArray();
        $relatedIds       = collect($data['related_videos'] ?? [])->pluck('id')->toArray();

        // Убираем ненужные ключи из $data
        unset(
            $data['images'],
            $data['deletedImages'],
            $data['sections'],
            $data['articles'],
            $data['related_videos'],
            $data['_method']
        );

        try {
            DB::beginTransaction();

            // 1) Удаляем выбранные пользователем изображения
            if (!empty($deletedImageIds)) {
                // отвязываем от pivot
                $video->images()->detach($deletedImageIds);
                // удаляем сами записи и файлы
                $this->deleteImages($deletedImageIds);
            }

            // 2) Обновляем базовые поля статьи
            $video->update($data);

            if ($data['source_type'] === 'local' && $request->hasFile('video_file')) {
                // очистим старую версию (если нужно)
                $video->clearMediaCollection('videos');
                $video
                    ->addMediaFromRequest('video_file')
                    ->toMediaCollection('videos');
            }

            // 3) Синхронизация связей
            $video->sections()->sync($sectionIds);
            $video->articles()->sync($articleIds);
            $video->relatedVideos()->sync($relatedIds);

            // 4) Обработка изображений
            $syncData = [];
            foreach ($imagesData as $index => $imageData) {
                $fileKey = "images.{$index}.file";

                // a) Существующее изображение
                if (!empty($imageData['id'])) {
                    $img = VideoImage::find($imageData['id']);

                    // Если изображение не удаляется
                    if ($img && !in_array($img->id, $deletedImageIds, true)) {
                        // Обновляем order, alt, caption
                        $img->update([
                            'order'   => $imageData['order']   ?? $img->order,
                            'alt'     => $imageData['alt']     ?? $img->alt,
                            'caption' => $imageData['caption'] ?? $img->caption,
                        ]);

                        // Если пришёл новый файл — меняем медиа
                        if ($request->hasFile($fileKey)) {
                            $img->clearMediaCollection('images');
                            $img->addMedia($request->file($fileKey))
                                ->toMediaCollection('images');
                        }

                        // Готовим данные для pivot sync
                        $syncData[$img->id] = ['order' => $img->order];
                    }

                    // b) Новое изображение (нет ID, но есть файл)
                } elseif ($request->hasFile($fileKey)) {
                    $new = VideoImage::create([
                        'order'   => $imageData['order']   ?? 0,
                        'alt'     => $imageData['alt']     ?? '',
                        'caption' => $imageData['caption'] ?? '',
                    ]);

                    // Загружаем файл
                    $new->addMedia($request->file($fileKey))
                        ->toMediaCollection('images');

                    $syncData[$new->id] = ['order' => $new->order];
                }
            }

            // 5) Синхронизируем оставшиеся и новые изображения в pivot
            $video->images()->sync($syncData);

            DB::commit();

            Log::info('Видео обновлено: ', ['id' => $video->id, 'title' => $video->title]);
            return redirect()->route('admin.videos.index')->with('success', __('admin/controllers/videos.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении видео ID {$video->id}: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/videos.update_error')]);
        }
    }

    /**
     * Удаление указанного видео вместе с изображениями.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Video $video Модель видео для удаления.
     * @return RedirectResponse Редирект на список видео с сообщением.
     */
    public function destroy(Video $video): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('delete-video', $video);

        try {
            DB::beginTransaction();
            // Используем приватный метод deleteImages
            $this->deleteImages($video->images()->pluck('id')->toArray());
            $video->delete();
            DB::commit();

            Log::info('Видео удалено: ID ' . $video->id);
            return redirect()->route('admin.videos.index')
                ->with('success', __('admin/controllers/videos.deleted_with_images'));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.delete_error')]);
        }
    }

    /**
     * Массовое удаление указанных видео.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-videos');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:articles,id',
        ]);

        $videoIds = $validated['ids'];
        $count = count($videoIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции

            $allImageIds = VideoImage::whereHas('videos', fn($q) => $q->whereIn('videos.id', $videoIds))
                ->pluck('id')->toArray();

            if (!empty($allImageIds)) {
                DB::table('video_has_images')->whereIn('video_id', $videoIds)->delete();
                $this->deleteImages($allImageIds);
            }

            Video::whereIn('id', $videoIds)->delete();
            DB::commit();

            Log::info('Видео удалены: ', $videoIds);
            return redirect()->route('admin.videos.index')
                ->with('success', __('admin/controllers/videos.bulk_deleted', ['count' => $count]));
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении видео: " . $e->getMessage(), ['ids' => $videoIds]);
            return back()->withErrors(['general' => __('admin/controllers/videos.delete_error')]);
        }
    }

    /**
     * Включение Статьи в левом сайдбаре
     * Использует Route Model Binding и UpdateLeftRequest.
     *
     * @param UpdateLeftRequest $request
     * @param Video $video
     * @return RedirectResponse
     */
    public function updateLeft(UpdateLeftRequest $request, Video $video): RedirectResponse
    {
        // authorize() в UpdateLeftRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $video->left = $validated['left'];
            $video->save();
            DB::commit();

            Log::info("Обновлено значение активации в левой колонке для видео ID {$video->id}");
            return back()->with('success', __('admin/controllers/videos.left_updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления значение в левой колонке видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.left_update_error')]);
        }
    }

    /**
     * Обновление статуса активности в левой колонке массово
     *
     * @param Request $request
     * @return JsonResponse Json ответ
     */
    public function bulkUpdateLeft(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:videos,id',
            'left' => 'required|boolean',
        ]);

        Video::whereIn('id', $data['ids'])->update(['left' => $data['left']]);

        return response()->json(['success' => true]);
    }

    /**
     * Включение Главными
     * Использует Route Model Binding и UpdateMainRequest.
     *
     * @param UpdateMainRequest $request
     * @param Video $video
     * @return RedirectResponse
     */
    public function updateMain(UpdateMainRequest $request, Video $video): RedirectResponse
    {
        // authorize() в UpdateMainRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $video->main = $validated['main'];
            $video->save();
            DB::commit();

            Log::info("Обновлено значение активации в главном для видео ID {$video->id}");
            return back()->with('success', __('admin/controllers/videos.main_updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления значение в главном видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.main_update_error')]);
        }
    }

    /**
     * Обновление статуса активности в главном массово
     *
     * @param Request $request
     * @return JsonResponse Json ответ
     */
    public function bulkUpdateMain(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:videos,id',
            'main' => 'required|boolean',
        ]);

        Video::whereIn('id', $data['ids'])->update(['main' => $data['main']]);

        return response()->json(['success' => true]);
    }

    /**
     * Включение Статьи в правом сайдбаре
     * Использует Route Model Binding и UpdateRightRequest.
     *
     * @param UpdateRightRequest $request
     * @param Video $video
     * @return RedirectResponse
     */
    public function updateRight(UpdateRightRequest $request, Video $video): RedirectResponse
    {
        // authorize() в UpdateRightRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $video->right = $validated['right'];
            $video->save();
            DB::commit();

            Log::info("Обновлено значение активации в правой колонке для видео ID {$video->id}");
            return back()->with('success', __('admin/controllers/videos.right_updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления значение в правой колонке видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.right_update_error')]);
        }
    }

    /**
     * Обновление статуса активности в правой колонке массово
     *
     * @param Request $request
     * @return JsonResponse Json ответ
     */
    public function bulkUpdateRight(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:videos,id',
            'right' => 'required|boolean',
        ]);

        Video::whereIn('id', $data['ids'])->update(['right' => $data['right']]);

        return response()->json(['success' => true]);
    }

    /**
     * Обновление статуса активности видео.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Video $video Модель видео для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Video $video): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $video->activity = $validated['activity'];
            $video->save();
            DB::commit();

            $actionText = $video->activity ? __('admin/controllers/common.activated')
                : __('admin/controllers/common.deactivated');

            Log::info("Обновлено activity видео ID {$video->id} на {$video->activity}");
            return back()
                ->with('success', __('admin/controllers/videos.activity_updated',
                    ['title' => $video->title, 'action' => $actionText]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.activity_error')]);
        }
    }

    /**
     * Обновление статуса активности массово
     *
     * @param Request $request
     * @return JsonResponse Json ответ
     */
    public function bulkUpdateActivity(Request $request): JsonResponse
    {
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:videos,id',
            'activity' => 'required|boolean',
        ]);

        Video::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);

        return response()->json(['success' => true]);
    }

    /**
     * Обновление значения сортировки для одного видео.
     * Использует Route Model Binding и UpdateSortEntityRequest.
     *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Video $video Модель видео для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Video $video): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $video->sort = $validated['sort'];
            $video->save();
            DB::commit();

            Log::info("Обновлено sort видео ID {$video->id} на {$video->sort}");
            return back()->with('success', __('admin/controllers/videos.sort_updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления сортировки видео ID {$video->id}: " . $e->getMessage());
            return back()->withErrors(['sort' => __('admin/controllers/videos.sort_update_error')]);
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'videos'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-videos');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'videos' => 'required|array',
            'videos.*.id' => ['required', 'integer', 'exists:videos,id'],
            'videos.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['videos'] as $videoData) {
                Video::where('id', $videoData['id'])->update(['sort' => $videoData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка видео', ['count' => count($validated['videos'])]);
            return back()->with('success', __('admin/controllers/videos.bulk_sort_updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки видео: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/videos.bulk_sort_update_error')]);
        }
    }

    // --- Метод clone отсутствует, можно добавить по аналогии с ArticleController ---

    /**
     * Приватный метод удаления изображений превью для видео.
     */
    private function deleteImages(array $imageIds): void
    {
        if (empty($imageIds)) return;
        $imagesToDelete = VideoImage::whereIn('id', $imageIds)->get();
        foreach ($imagesToDelete as $image) {
            $image->clearMediaCollection('images'); // Удаляем медиафайл Spatie
            $image->delete(); // Удаляем запись VideoImage
        }
        Log::info('Удалены записи VideoImage и их медиа: ', ['image_ids' => $imageIds]);
    }
}
