<?php

namespace App\Http\Controllers\Api\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Article\ArticleRequest;
use App\Http\Resources\Admin\Article\ArticleResource;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleImage;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Tag\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     @OA\Contact(
 *         email="kosolapov1976@gmail.com"
 *     )
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 */

/**
 * @OA\Schema(
 *     schema="Article",
 *     type="object",
 *     title="Article",
 *     description="Article model",
 *     required={"id", "title", "content", "created_at", "updated_at"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Article Title"),
 *     @OA\Property(property="content", type="string", example="Article content..."),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/image.jpg"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T00:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-01T00:00:00Z")
 * )
 */
class ApiArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/articles",
     *     operationId="getArticles",
     *     tags={"Articles"},
     *     summary="Display a listing of the articles",
     *     description="Get a list of articles with their sections, tags and images",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Article")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $articles = Article::with(['sections', 'tags', 'images'])->get();
        $articlesCount = DB::table('articles')->count();

        return response()->json([
            'articles' => ArticleResource::collection($articles),
            'articlesCount' => $articlesCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/articles",
     *     operationId="storeArticle",
     *     tags={"Articles"},
     *     summary="Store a newly created article",
     *     description="Create a new article with sections, tags and images",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     )
     * )
     */
    public function store(ArticleRequest $request): JsonResponse
    {
        $data = $request->validated();
        $imagesData = $data['images'] ?? [];
        // Удаляем связи и изображения из основных данных для создания Article
        unset($data['images'], $data['sections'], $data['tags'], $data['related_articles']);

        // Создание статьи
        $article = Article::create($data);

        // Обработка связей (без изменений)
        if ($request->has('sections')) {
            $sectionTitles = array_column($request->input('sections'), 'title');
            $sectionIds = Section::whereIn('title', $sectionTitles)->pluck('id')->toArray();
            $article->sections()->sync($sectionIds);
        }
        if ($request->has('tags')) {
            $tagNames = array_column($request->input('tags'), 'name');
            $tagIds = Tag::whereIn('name', $tagNames)->pluck('id')->toArray();
            $article->tags()->sync($tagIds);
        }
        // Связанные статьи (если нужно)
        if ($request->has('related_articles')) {
            $relatedTitles = array_column($request->input('related_articles'), 'title');
            $relatedIds = Article::whereIn('title', $relatedTitles)
                ->where('id', '<>', $article->id)->pluck('id')->toArray();
            $article->relatedArticles()->sync($relatedIds);
        }

        // --- ИСПРАВЛЕННАЯ ОБРАБОТКА ИЗОБРАЖЕНИЙ ---
        $imageIds = [];
        if (!empty($imagesData)) {
            foreach ($imagesData as $imageData) {
                // Создаем запись ArticleImage
                $image = ArticleImage::create([
                    'order'   => $imageData['order'] ?? 0,
                    'alt'     => $imageData['alt'] ?? '',
                    'caption' => $imageData['caption'] ?? '',
                ]);

                // Добавляем медиафайл, если он есть
                if (isset($imageData['file']) && $request->hasFile('images.' . key($imagesData) . '.file')) { // Проверяем наличие файла в запросе
                    try {
                        // Получаем файл по его индексу в массиве (более надежно)
                        $file = $request->file('images.' . key($imagesData) . '.file');
                        if ($file && $file->isValid()) {
                            $image->addMedia($file)->toMediaCollection('images');
                            $imageIds[] = $image->id; // Добавляем ID только если медиа добавлено
                        } else {
                            $image->delete(); // Удаляем запись, если файл невалидный
                            Log::warning('Невалидный файл изображения при создании статьи API', ['imageData' => $imageData]);
                        }
                    } catch (\Exception $e) {
                        $image->delete(); // Удаляем запись при ошибке Spatie
                        Log::error('Ошибка добавления медиа Spatie при создании статьи API: ' . $e->getMessage(), ['imageData' => $imageData]);
                        // Можно вернуть ошибку 500 или продолжить без этого изображения
                    }
                } else {
                    $image->delete(); // Удаляем запись, если нет файла
                    Log::warning('Нет файла для нового изображения при создании статьи API', ['imageData' => $imageData]);
                }
                next($imagesData); // Переходим к следующему элементу для правильного индекса key()
            }
        }
        // Синхронизируем только успешно созданные изображения
        $article->images()->sync($imageIds);
        // --- КОНЕЦ ИСПРАВЛЕННОЙ ОБРАБОТКИ ---

        // Перезагружаем статью со связями для ответа
        $article->load(['sections', 'tags', 'images', 'relatedArticles']);

        return response()->json(new ArticleResource($article), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/articles/{id}",
     *     operationId="getArticle",
     *     tags={"Articles"},
     *     summary="Display the specified article",
     *     description="Get a specific article by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     )
     * )
     */
    public function show(Article $article): JsonResponse
    {
        return response()->json(new ArticleResource($article));
    }

    /**
     * @OA\Put(
     *     path="/api/articles/{id}",
     *     operationId="updateArticle",
     *     tags={"Articles"},
     *     summary="Update the specified article",
     *     description="Update a specific article by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     )
     * )
     */
    public function update(ArticleRequest $request, Article $article): JsonResponse
    {
        $data = $request->validated();
        $imagesData = $data['images'] ?? [];

        // Удаление изображений, отмеченных на клиенте
        if ($request->has('deletedImages') && is_array($request->deletedImages)) {
            $this->deleteImages($request->deletedImages); // Используем исправленный метод
        }

        // Удаляем данные связей и изображений из основного массива
        unset($data['images'], $data['deletedImages'], $data['sections'], $data['tags'], $data['related_articles']);

        // Обновление данных статьи
        $article->update($data);

        // Обновление связей (без изменений)
        $sectionIds = [];
        if ($request->has('sections')) {
            $sectionTitles = array_column($request->input('sections'), 'title');
            $sectionIds = Section::whereIn('title', $sectionTitles)->pluck('id')->toArray();
        }
        $article->sections()->sync($sectionIds);

        $tagIds = [];
        if ($request->has('tags')) {
            $tagNames = array_column($request->input('tags'), 'name');
            $tagIds = Tag::whereIn('name', $tagNames)->pluck('id')->toArray();
        }
        $article->tags()->sync($tagIds);

        // Связанные статьи (если нужно)
        $relatedIds = [];
        if ($request->has('related_articles')) {
            $relatedTitles = array_column($request->input('related_articles'), 'title');
            $relatedIds = Article::whereIn('title', $relatedTitles)
                ->where('id', '<>', $article->id)->pluck('id')->toArray();
        }
        $article->relatedArticles()->sync($relatedIds);

        // --- ИСПРАВЛЕННАЯ ОБРАБОТКА ИЗОБРАЖЕНИЙ ПРИ ОБНОВЛЕНИИ ---
        $currentImageIds = [];
        if (!empty($imagesData)) {
            $imageIndex = 0; // Индекс для доступа к файлам
            foreach ($imagesData as $imageData) {
                $image = null;
                $fileKey = 'images.' . $imageIndex . '.file'; // Ключ файла в запросе

                if (isset($imageData['id'])) {
                    // Обновляем существующее
                    $image = ArticleImage::find($imageData['id']);
                    if ($image) {
                        $image->update([
                            'order'   => $imageData['order'] ?? $image->order,
                            'alt'     => $imageData['alt'] ?? '',
                            'caption' => $imageData['caption'] ?? '',
                        ]);

                        // Если пришел НОВЫЙ файл для СУЩЕСТВУЮЩЕГО image
                        if ($request->hasFile($fileKey)) {
                            try {
                                $file = $request->file($fileKey);
                                if ($file && $file->isValid()) {
                                    $image->clearMediaCollection('images'); // Удаляем старый файл Spatie
                                    $image->addMedia($file)->toMediaCollection('images');
                                } else {
                                    Log::warning('Невалидный файл при обновлении изображения статьи API', ['imageData' => $imageData]);
                                }
                            } catch (\Exception $e) {
                                Log::error('Ошибка обновления медиа Spatie при обновлении статьи API: ' . $e->getMessage(), ['imageData' => $imageData]);
                            }
                        }
                        $currentImageIds[] = $image->id; // Добавляем ID существующего
                    } else {
                        Log::warning('Существующее изображение не найдено при обновлении статьи API', ['imageData' => $imageData]);
                    }
                } elseif ($request->hasFile($fileKey)) {
                    // Создаем новое изображение, т.к. ID нет, но есть файл
                    $image = ArticleImage::create([
                        'order'   => $imageData['order'] ?? 0,
                        'alt'     => $imageData['alt'] ?? '',
                        'caption' => $imageData['caption'] ?? '',
                    ]);
                    try {
                        $file = $request->file($fileKey);
                        if ($file && $file->isValid()) {
                            $image->addMedia($file)->toMediaCollection('images');
                            $currentImageIds[] = $image->id; // Добавляем ID нового
                        } else {
                            $image->delete(); // Удаляем запись, если файл невалидный
                            Log::warning('Невалидный файл для нового изображения при обновлении статьи API', ['imageData' => $imageData]);
                        }
                    } catch (\Exception $e) {
                        $image->delete(); // Удаляем запись при ошибке Spatie
                        Log::error('Ошибка добавления нового медиа Spatie при обновлении статьи API: ' . $e->getMessage(), ['imageData' => $imageData]);
                    }
                }
                $imageIndex++; // Увеличиваем индекс для следующего файла
            }
        }
        // Синхронизируем все ID изображений, которые должны остаться у статьи
        $article->images()->sync($currentImageIds);
        // --- КОНЕЦ ИСПРАВЛЕННОЙ ОБРАБОТКИ ---

        // Перезагружаем статью со связями для ответа
        $article->load(['sections', 'tags', 'images', 'relatedArticles']);

        return response()->json(new ArticleResource($article));
    }

    /**
     * @OA\Delete(
     *     path="/api/articles/{id}",
     *     operationId="deleteArticle",
     *     tags={"Articles"},
     *     summary="Remove the specified article",
     *     description="Delete a specific article by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successful operation"
     *     )
     * )
     */
    public function destroy(Article $article): JsonResponse
    {
        // --- ИСПРАВЛЕННОЕ УДАЛЕНИЕ ИЗОБРАЖЕНИЙ ---
        // Удаление связанных записей ArticleImage и их медиафайлов
        $article->images()->each(function (ArticleImage $image) {
            $image->clearMediaCollection('images'); // Удаляем файлы Spatie
            $image->delete(); // Удаляем запись ArticleImage
        });
        // --- КОНЕЦ ИСПРАВЛЕННОГО УДАЛЕНИЯ ---

        // Удаляем саму статью (связи в сводных таблицах удалятся каскадно, если настроено)
        $article->delete();

        return response()->json(null, 204);
    }

    /**
     * Вспомогательный метод для удаления изображений по списку ID.
     * Используется в update при передаче deletedImages.
     */
    private function deleteImages(array $imageIds): void
    {
        if (empty($imageIds)) {
            return;
        }
        $imagesToDelete = ArticleImage::whereIn('id', $imageIds)->get();

        foreach ($imagesToDelete as $image) {
            // --- ИСПОЛЬЗУЕМ SPATIE ДЛЯ УДАЛЕНИЯ ФАЙЛОВ ---
            $image->clearMediaCollection('images');
            // --- КОНЕЦ ---
            $image->delete(); // Удаляем запись ArticleImage
        }

        Log::info('Удалены изображения через API: ', ['image_ids' => $imageIds]);
    }
}
