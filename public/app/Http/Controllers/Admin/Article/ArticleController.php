<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Article\ArticleRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateLeftRequest;
use App\Http\Requests\Admin\UpdateMainRequest;
use App\Http\Requests\Admin\UpdateRightRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Http\Resources\Admin\Article\ArticleSharedResource;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Tag\TagResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleImage;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Tag\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Статьями в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 * - Клонирование
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Article\Article Модель Статьи
 * @see \App\Http\Requests\Admin\Article\ArticleRequest Запрос для создания/обновления
 */
class ArticleController extends Controller
{
    /**
     * Отображение списка всех Статей.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-articles', Article::class);

        $adminCountArticles = config('site_settings.AdminCountArticles', 15);
        $adminSortArticles = config('site_settings.AdminSortArticles', 'idDesc');

        try {
            // Загружаем ВСЕ статьи с секциями и изображениями, счётчики тегов, комментариев, лайков
            $articles = Article::withCount(['sections', 'tags', 'images', 'comments', 'likes'])
                                    ->with(['images', 'sections'])
                                    ->get();

            $articlesCount = $articles->count(); // Считаем из загруженной коллекции

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки постов для Index: " . $e->getMessage());
            $articles = collect(); // Пустая коллекция в случае ошибки
            $articlesCount = 0;
            session()->flash('error', __('admin/controllers/articles.index_error'));
        }

        return Inertia::render('Admin/Articles/Index', [
            'articles' => ArticleResource::collection($articles),
            'articlesCount' => $articlesCount,
            'adminCountArticles' => (int)$adminCountArticles,
            'adminSortArticles' => $adminSortArticles,
        ]);
    }

    /**
     * Отображение формы создания новой статьи.
     * Передает список секций, тегов, статей для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-articles', Article::class);

        $sections = Section::select('id', 'title', 'locale')->orderBy('title')->get(); // секции
        $tags = Tag::select('id', 'name', 'locale')->orderBy('name')->get(); // теги
        $allArticles = Article::select('id', 'title', 'locale')->orderBy('title')->get(); // связанные статьи

        return Inertia::render('Admin/Articles/Create', [
            'sections' => SectionResource::collection($sections), // У секций нет Shared, OK
            'tags' => TagResource::collection($tags), // У тегов нет Shared, OK
            'related_articles' => ArticleSharedResource::collection($allArticles), // Используем Shared
        ]);
    }

    /**
     * Сохранение новой статьи в базе данных.
     * Использует SectionRequest для валидации и авторизации.
     * Синхронизирует связанные изображения, секции, теги, статьи.
     *
     * @param ArticleRequest $request
     * @return RedirectResponse Редирект на список статей с сообщением.
     */
    public function store(ArticleRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $imagesData   = $data['images']            ?? [];
        $sectionIds   = collect($data['sections']   ?? [])->pluck('id')->toArray();
        $tagIds       = collect($data['tags']       ?? [])->pluck('id')->toArray();
        $relatedIds   = collect($data['related_articles'] ?? [])->pluck('id')->toArray();
        unset($data['images'], $data['sections'], $data['tags'], $data['related_articles']);

        try {
            DB::beginTransaction();
            $article = Article::create($data);

            // Связи
            $article->sections()->sync($sectionIds);
            $article->tags()->sync($tagIds);
            $article->relatedArticles()->sync($relatedIds);

            // Обработка изображений
            $imageSyncData = [];
            $imageIndex    = 0;

            foreach ($imagesData as $imageData) {
                $fileKey = "images.{$imageIndex}.file";

                if ($request->hasFile($fileKey)) {
                    // Сначала создаём запись
                    $image = ArticleImage::create([
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
                            Log::warning("Недопустимый файл изображения с индексом {$imageIndex} для статьи {$article->id}", [
                                'fileKey' => $fileKey,
                                'error'   => $file->getErrorMessage(),
                            ]);
                            // Откатили создание ArticleImage
                            $image->delete();
                            continue;
                        }
                    } catch (Throwable $e) {
                        Log::error("Ошибка Spatie media-library в статье {$article->id}, индекс изображения - {$imageIndex}: {$e->getMessage()}", [
                            'trace' => $e->getTraceAsString(),
                        ]);
                        // Откатили создание ArticleImage
                        $image->delete();
                        continue;
                    }
                }

                $imageIndex++;
            }

            $article->images()->sync($imageSyncData);

            DB::commit();

            Log::info('Статья успешно создана', ['id' => $article->id, 'title' => $article->title]);
            return redirect()->route('admin.articles.index')->with('success', __('admin/controllers/articles.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании статьи: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/articles.create_error')]);
        }
    }

    /**
     * Отображение формы редактирования существующей статьи.
     * Использует Route Model Binding для получения модели.
     *
     * @param Article $article Модель статьи, найденная по ID из маршрута.
     * @return Response
     */
    public function edit(Article $article): Response
    {
        // TODO: Проверка прав $this->authorize('update-articles', $article);

        // Загружаем все необходимые связи
        $article->load(['sections', 'tags', 'images' => fn($q) => $q->orderBy('order', 'asc'), 'relatedArticles']);

        // Загружаем данные для селектов
        $sections = Section::select('id', 'title', 'locale')->orderBy('title')->get();
        $tags = Tag::select('id', 'name', 'locale')->orderBy('name')->get();
        $allArticles = Article::where('id', '<>', $article->id)->select('id', 'title', 'locale')->orderBy('title')->get(); // Исключаем текущую

        return Inertia::render('Admin/Articles/Edit', [
            'article' => new ArticleResource($article),
            'sections' => SectionResource::collection($sections),
            'tags' => TagResource::collection($tags),
            'related_articles' => ArticleSharedResource::collection($allArticles), // Используем Shared
        ]);
    }

    /**
     * Обновление существующей статьи в базе данных.
     * Использует ArticleRequest и Route Model Binding.
     * Синхронизирует связанные изображения, теги, секции, статьи если они переданы.
     *
     * @param ArticleRequest $request Валидированный запрос.
     * @param Article $article Модель статьи для обновления.
     * @return RedirectResponse Редирект на список статей с сообщением.
     */
    public function update(ArticleRequest $request, Article $article): RedirectResponse
    {
        $data = $request->validated();

        // Извлекаем все данные
        $imagesData       = $data['images'] ?? [];
        $deletedImageIds  = $data['deletedImages'] ?? [];
        $sectionIds       = collect($data['sections'] ?? [])->pluck('id')->toArray();
        $tagIds           = collect($data['tags'] ?? [])->pluck('id')->toArray();
        $relatedIds       = collect($data['related_articles'] ?? [])->pluck('id')->toArray();

        // Убираем ненужные ключи из $data
        unset(
            $data['images'],
            $data['deletedImages'],
            $data['sections'],
            $data['tags'],
            $data['related_articles'],
            $data['_method']
        );

        try {
            DB::beginTransaction();

            // 1) Удаляем выбранные пользователем изображения
            if (!empty($deletedImageIds)) {
                // отвязываем от pivot
                $article->images()->detach($deletedImageIds);
                // удаляем сами записи и файлы
                $this->deleteImages($deletedImageIds);
            }

            // 2) Обновляем базовые поля статьи
            $article->update($data);

            // 3) Синхронизация связей
            $article->sections()->sync($sectionIds);
            $article->tags()->sync($tagIds);
            $article->relatedArticles()->sync($relatedIds);

            // 4) Обработка изображений
            $syncData = [];
            foreach ($imagesData as $index => $imageData) {
                $fileKey = "images.{$index}.file";

                // a) Существующее изображение
                if (!empty($imageData['id'])) {
                    $img = ArticleImage::find($imageData['id']);

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
                    $new = ArticleImage::create([
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
            $article->images()->sync($syncData);

            DB::commit();

            Log::info('Статья обновлена: ', ['id' => $article->id, 'title' => $article->title]);
            return redirect()->route('admin.articles.index')->with('success', __('admin/controllers/articles.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении статьи ID {$article->id}: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/articles.update_error')]);
        }
    }

    /**
     * Удаление указанной статьи вместе с изображениями.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Article $article Модель статьи для удаления.
     * @return RedirectResponse Редирект на список статей с сообщением.
     */
    public function destroy(Article $article): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-articles', $article);

        try {
            DB::beginTransaction();
            // Используем приватный метод deleteImages
            $this->deleteImages($article->images()->pluck('id')->toArray());
            $article->delete();
            DB::commit();

            Log::info('Статья удалена: ID ' . $article->id);
            return redirect()->route('admin.articles.index')->with('success', __('admin/controllers/articles.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.delete_error')]);
        }
    }

    /**
     * Массовое удаление указанных статей.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-articles');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:articles,id',
        ]);

        $articleIds = $validated['ids'];
        $count = count($articleIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции

            $allImageIds = ArticleImage::whereHas('articles', fn($q) => $q->whereIn('articles.id', $articleIds))
                ->pluck('id')->toArray();

            if (!empty($allImageIds)) {
                DB::table('article_has_images')->whereIn('article_id', $articleIds)->delete();
                $this->deleteImages($allImageIds);
            }

            Article::whereIn('id', $articleIds)->delete();
            DB::commit();

            Log::info('Статьи удалены: ', $articleIds);
            return redirect()->route('admin.articles.index')
                ->with('success', __('admin/controllers/articles.bulk_deleted', ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении статей: " . $e->getMessage(), ['ids' => $articleIds]);
            return back()->withErrors(['general' => __('admin/controllers/articles.bulk_delete_error')]);
        }
    }

    /**
     * Включение Статьи в левом сайдбаре
     * Использует Route Model Binding и UpdateLeftRequest.
     *
     * @param UpdateLeftRequest $request
     * @param Article $article
     * @return RedirectResponse
     */
    public function updateLeft(UpdateLeftRequest $request, Article $article): RedirectResponse
    {
        // authorize() в UpdateLeftRequest
        $validated = $request->validated();

        try {
            $article->left = $validated['left'];
            $article->save();

            Log::info("Обновлено значение активации в левой колонке для статьи ID {$article->id}");
            return redirect()->route('admin.articles.index')
                ->with('success', __('admin/controllers/articles.updated_left_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в левой колонке статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.updated_left_error')]);
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
        // TODO: Проверка прав $this->authorize('update-articles', $article);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:articles,id',
            'left' => 'required|boolean',
        ]);

        try {
            Article::whereIn('id', $data['ids'])->update(['left' => $data['left']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в левой колонке: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers/articles.bulk_left_update_error'),
            ], 500);
        }
    }

    /**
     * Включение Главными
     * Использует Route Model Binding и UpdateMainRequest.
     *
     * @param UpdateMainRequest $request
     * @param Article $article
     * @return RedirectResponse
     */
    public function updateMain(UpdateMainRequest $request, Article $article): RedirectResponse
    {
        // authorize() в UpdateMainRequest
        $validated = $request->validated();

        try {
            $article->main = $validated['main'];
            $article->save();

            Log::info("Обновлено значение активации в главном для статьи ID {$article->id}");
            return redirect()->route('admin.articles.index')
                ->with('success', __('admin/controllers/articles.updated_main_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в главном статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.main_update_error')]);
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
        // TODO: Проверка прав $this->authorize('update-articles', $article);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:articles,id',
            'main' => 'required|boolean',
        ]);

        try {
            Article::whereIn('id', $data['ids'])->update(['main' => $data['main']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в главном: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers/articles.bulk_main_update_error'),
            ], 500);
        }
    }

    /**
     * Включение Статьи в правом сайдбаре
     * Использует Route Model Binding и UpdateRightRequest.
     *
     * @param UpdateRightRequest $request
     * @param Article $article
     * @return RedirectResponse
     */
    public function updateRight(UpdateRightRequest $request, Article $article): RedirectResponse
    {
        // authorize() в UpdateRightRequest
        $validated = $request->validated();

        try {
            $article->right = $validated['right'];
            $article->save();

            Log::info("Обновлено значение активации в правой колонке для статьи ID {$article->id}");
            return redirect()->route('admin.articles.index')
                ->with('success', __('admin/controllers/articles.updated_right_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в правой колонке статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.right_update_error')]);
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
        // TODO: Проверка прав $this->authorize('update-articles', $article);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:articles,id',
            'right' => 'required|boolean',
        ]);

        try {
            Article::whereIn('id', $data['ids'])->update(['right' => $data['right']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в правой колонке: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers/articles.bulk_right_update_error'),
            ], 500);
        }
    }

    /**
     * Обновление статуса активности статьи.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Article $article Модель статьи для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Article $article): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            $article->activity = $validated['activity'];
            $article->save();

            $actionText = $article->activity ? __('admin/controllers/articles.activated')
                : __('admin/controllers/articles.deactivated');

            Log::info("Обновлено activity статьи ID {$article->id} на {$article->activity}");
            return back()->with('success', __('admin/controllers/articles.activity',
                ['title' => $article->title, 'action' => $actionText]));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.update_activity_error')]);
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
        // TODO: Проверка прав $this->authorize('update-articles', $article);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:articles,id',
            'activity' => 'required|boolean',
        ]);

        Article::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);

        return response()->json(['success' => true]);
    }

    /**
     * Обновление значения сортировки для одной статьи.
     * Использует Route Model Binding и UpdateSortEntityRequest.
     *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Article $article Модель статьи для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Article $article): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $article->sort = $validated['sort'];
            $article->save();
            Log::info("Обновлено sort статьи ID {$article->id} на {$article->sort}");
            return back();

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки статьи ID {$article->id}: " . $e->getMessage());
            return back()->withErrors(['sort' => __('admin/controllers/articles.update_sort_error')]);
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'articles'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-articles');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'articles' => 'required|array',
            'articles.*.id' => ['required', 'integer', 'exists:articles,id'],
            'articles.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['articles'] as $articleData) {
                // Используем update для массового обновления, если возможно, или where/update
                Article::where('id', $articleData['id'])->update(['sort' => $articleData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка статей', ['count' => count($validated['articles'])]);
            return back();

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки статей: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/articles.update_sort_bulk_error')]);
        }
    }

    /**
     * Клонирование рубрики.
     * Копирует основные поля и связи с секциями.
     * Генерирует новые уникальные title и url.
     *
     * @param Request $request (Не используется, но нужен для сигнатуры маршрута)
     * @param Article $article Модель рубрики для клонирования (через RMB).
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function clone(Request $request, Article $article): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('create--articles', $article);
        DB::beginTransaction();

        try {
            $clonedArticle = $article->replicate();

            // TODO: Обеспечить уникальность title и url с учетом locale
            $clonedArticle->title = $article->title . '-2';
            $clonedArticle->url = $article->url . '-2';
            $clonedArticle->activity = false;
            $clonedArticle->views = 0;
            $clonedArticle->created_at = now();
            $clonedArticle->updated_at = now();
            $clonedArticle->save();

            // Клонируем связи
            $clonedArticle->sections()->sync($article->sections()->pluck('id'));
            $clonedArticle->tags()->sync($article->tags()->pluck('id'));
            $clonedArticle->relatedArticles()->sync($article->relatedArticles()->pluck('id')); // Клонируем связи рекомендаций? Или нет?

            // Клонируем изображения
            $imageSyncData = [];
            foreach ($article->images as $image) {
                $clonedImage = $image->replicate(); // Клонируем запись ArticleImage
                $clonedImage->save();
                // Копируем медиафайл
                $originalMedia = $image->getFirstMedia('images');
                if ($originalMedia) {
                    try {
                        $originalMedia->copy($clonedImage, 'images'); // Копируем медиа в новый объект
                        $imageSyncData[$clonedImage->id] = ['order' => $image->pivot->order]; // Сохраняем порядок
                    } catch (Throwable $e) {
                        Log::error("Ошибка копирования медиа при клонировании статьи: " . $e->getMessage());
                        // Можно пропустить это изображение или откатить транзакцию
                    }
                }
            }
            $clonedArticle->images()->sync($imageSyncData); // Синхронизируем клонированные изображения

            DB::commit();

            Log::info('Статья ID ' . $article->id . ' успешно клонирована в ID ' . $clonedArticle->id);
            return redirect()->route('admin.articles.index')->with('success', __('admin/controllers/articles.cloned'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при клонировании статьи ID {$article->id}: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/articles.clone_error')]);
        }
    }

    /**
     * Приватный метод удаления изображений (для Spatie)
     *
     * @param array $imageIds
     * @return void
     */
    private function deleteImages(array $imageIds): void
    {
        if (empty($imageIds)) return;
        $imagesToDelete = ArticleImage::whereIn('id', $imageIds)->get();
        foreach ($imagesToDelete as $image) {
            $image->clearMediaCollection('images');
            $image->delete();
        }
        Log::info('Удалены записи ArticleImage и их медиа: ', ['image_ids' => $imageIds]);
    }
}
