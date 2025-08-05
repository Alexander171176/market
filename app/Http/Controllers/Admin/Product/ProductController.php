<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\ProductRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateLeftRequest;
use App\Http\Requests\Admin\UpdateMainRequest;
use App\Http\Requests\Admin\UpdateRightRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Category\CategoryResource;
use App\Http\Resources\Admin\Product\ProductResource;
use App\Http\Resources\Admin\Product\ProductSharedResource;
use App\Http\Resources\Admin\ProductVariant\ProductVariantResource;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Models\Admin\Category\Category;
use App\Models\Admin\Product\Product;
use App\Models\Admin\Product\ProductImage;
use App\Models\Admin\Property\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Товарами в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 * - Клонирование
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Product\Product Модель товара
 * @see \App\Http\Requests\Admin\Product\ProductRequest Запрос для создания/обновления
 */
class ProductController extends Controller
{
    /**
     * Отображение списка всех Товаров.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-products', Product::class);

        $adminCountProducts = config('site_settings.AdminCountProducts', 15);
        $adminSortProducts = config('site_settings.AdminSortProducts', 'idDesc');

        try {
            // Загружаем ВСЕ статьи с секциями и изображениями, счётчики тегов, комментариев, лайков
            $products = Product::withCount(['images', 'comments', 'likes'])
                ->with(['images'])
                ->get();

            $productsCount = $products->count(); // Считаем из загруженной коллекции

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки постов для Index: " . $e->getMessage());
            $products = collect(); // Пустая коллекция в случае ошибки
            $productsCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => ProductResource::collection($products),
            'productsCount' => $productsCount,
            'adminCountProducts' => (int)$adminCountProducts,
            'adminSortProducts' => $adminSortProducts,
        ]);
    }

    /**
     * Отображение формы создания нового товара.
     * Передает список товара для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-products', Product::class);

        $allProducts = Product::select('id', 'title', 'locale')->orderBy('title')->get(); // связанные товары

        $categories = Category::select('id', 'title', 'locale')->orderBy('title')->get(); // категории

        return Inertia::render('Admin/Products/Create', [
            'related_products' => ProductSharedResource::collection($allProducts), // Используем Shared
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Сохранение нового товара в базе данных.
     * Использует ProductRequest для валидации и авторизации.
     * Синхронизирует связанные изображения, товары.
     *
     * @param ProductRequest $request
     * @return RedirectResponse Редирект на список товаров с сообщением.
     */
    public function store(ProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $imagesData   = $data['images'] ?? [];
        $categoryIds   = collect($data['categories'] ?? [])->pluck('id')->toArray();
        $relatedIds   = collect($data['related_products'] ?? [])->pluck('id')->toArray();
        $propertyValueIds = $data['property_values'] ?? [];
        unset($data['images'], $data['related_products'], $data['property_values']);

        try {
            DB::beginTransaction();
            $product = Product::create($data);

            // Связи
            $product->categories()->sync($categoryIds);
            $product->relatedProducts()->sync($relatedIds);
            $product->propertyValues()->sync($propertyValueIds);

            // Обработка изображений
            $imageSyncData = [];
            $imageIndex    = 0;

            foreach ($imagesData as $imageData) {
                $fileKey = "images.{$imageIndex}.file";

                if ($request->hasFile($fileKey)) {
                    // Сначала создаём запись
                    $image = ProductImage::create([
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
                            Log::warning("Недопустимый файл изображения с индексом {$imageIndex}
                                                    для товара {$product->id}", [
                                'fileKey' => $fileKey,
                                'error'   => $file->getErrorMessage(),
                            ]);
                            // Откатили создание ProductImage
                            $image->delete();
                            continue;
                        }
                    } catch (Throwable $e) {
                        Log::error("Ошибка Spatie media-library в товаре {$product->id},
                                            индекс изображения - {$imageIndex}: {$e->getMessage()}", [
                            'trace' => $e->getTraceAsString(),
                        ]);
                        // Откатили создание ProductImage
                        $image->delete();
                        continue;
                    }
                }

                $imageIndex++;
            }

            $product->images()->sync($imageSyncData);

            DB::commit();

            Log::info('Товар успешно создан', ['id' => $product->id, 'title' => $product->title]);
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.created_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании товара: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withInput()
                ->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение формы редактирования существующего товара.
     * Использует Route Model Binding для получения модели.
     *
     * @param Product $product Модель товара, найденный по ID из маршрута.
     * @return Response
     */
    public function edit(Product $product): Response
    {
        // TODO: Проверка прав $this->authorize('update-products', $product);

        // Загружаем все необходимые связи
        $product->load([
            'categories',
            'images',
            'relatedProducts',
            'propertyValues',
            'variants' => function ($query) {
                // Загружаем сами варианты и для каждого из них - его изображения
                $query->with('images')->orderBy('sort', 'asc');
            }
        ]);

        // Загружаем данные для селектов
        $categories = Category::select('id', 'title', 'locale')->orderBy('title')->get();

        // Загружаем данные для селектов
        $allProducts = Product::where('id', '<>', $product->id)->select('id', 'title', 'locale')->orderBy('title')->get(); // Исключаем текущую

        $allProperties = Property::with(['values' => fn($q) => $q->orderBy('sort')])
            ->where('activity', true)
            ->orderBy('sort')
            ->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => new ProductResource($product),
            'categories' => CategoryResource::collection($categories),
            'related_products' => ProductSharedResource::collection($allProducts), // Используем Shared
            'allProperties' => PropertyResource::collection($allProperties),
        ]);
    }

    /**
     * Обновление существующего товара в базе данных.
     * Использует ProductRequest и Route Model Binding.
     * Синхронизирует связанные изображения, товары если они переданы.
     *
     * @param ProductRequest $request Валидированный запрос.
     * @param Product $product Модель товара для обновления.
     * @return RedirectResponse Редирект на список товаров с сообщением.
     */
    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        // Извлекаем все данные
        $imagesData       = $data['images'] ?? [];
        $deletedImageIds  = $data['deletedImages'] ?? [];
        $categoryIds      = collect($data['categories'] ?? [])->pluck('id')->toArray();
        $relatedIds       = collect($data['related_products'] ?? [])->pluck('id')->toArray();
        $propertyValueIds = $data['property_values'] ?? [];

        // Убираем ненужные ключи из $data
        unset(
            $data['images'],
            $data['deletedImages'],
            $data['categories'],
            $data['related_products'],
            $data['property_values'],
            $data['_method']
        );

        try {
            DB::beginTransaction();

            // 1) Удаляем выбранные пользователем изображения
            if (!empty($deletedImageIds)) {
                // отвязываем от pivot
                $product->images()->detach($deletedImageIds);
                // удаляем сами записи и файлы
                $this->deleteImages($deletedImageIds);
            }

            // 2) Обновляем базовые поля статьи
            $product->update($data);

            // 3) Синхронизация связей
            $product->categories()->sync($categoryIds);
            $product->relatedProducts()->sync($relatedIds);
            $product->propertyValues()->sync($propertyValueIds);

            // 4) Обработка изображений
            $syncData = [];
            foreach ($imagesData as $index => $imageData) {
                $fileKey = "images.{$index}.file";

                // a) Существующее изображение
                if (!empty($imageData['id'])) {
                    $img = ProductImage::find($imageData['id']);

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
                    $new = ProductImage::create([
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
            $product->images()->sync($syncData);

            DB::commit();

            Log::info('Товар обновлен: ', ['id' => $product->id, 'title' => $product->title]);
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении товара ID {$product->id}: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withInput()
                ->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанного товара вместе с изображениями.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Product $product Модель товара для удаления.
     * @return RedirectResponse Редирект на список товаров с сообщением.
     */
    public function destroy(Product $product): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-products', $product);

        try {
            DB::beginTransaction();
            // Используем приватный метод deleteImages
            $this->deleteImages($product->images()->pluck('id')->toArray());
            $product->delete();
            DB::commit();

            Log::info('Товар удален: ID ' . $product->id);
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.deleted_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении товара ID {$product->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Массовое удаление указанных товаров.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-products');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:products,id',
        ]);

        $productIds = $validated['ids'];
        $count = count($productIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции

            $allImageIds = ProductImage::whereHas('products', fn($q) => $q
                ->whereIn('products.id', $productIds))
                ->pluck('id')->toArray();

            if (!empty($allImageIds)) {
                DB::table('product_has_images')->whereIn('product_id', $productIds)->delete();
                $this->deleteImages($allImageIds);
            }

            Product::whereIn('id', $productIds)->delete();
            DB::commit();

            Log::info('Статьи удалены: ', $productIds);
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.bulk_deleted_success',
                    ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении статей: "
                . $e->getMessage(), ['ids' => $productIds]);
            return back()
                ->with('error', __('admin/controllers.bulk_deleted_error'));
        }
    }

    /**
     * Включение Товара в левом сайдбаре
     * Использует Route Model Binding и UpdateLeftRequest.
     *
     * @param UpdateLeftRequest $request
     * @param Product $product
     * @return RedirectResponse
     */
    public function updateLeft(UpdateLeftRequest $request, Product $product): RedirectResponse
    {
        // authorize() в UpdateLeftRequest
        $validated = $request->validated();

        try {
            $product->left = $validated['left'];
            $product->save();

            Log::info("Обновлено значение активации в левой колонке для товара ID {$product->id}");
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.left_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в левой колонке товара ID {$product->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.left_updated_error'));
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
        // TODO: Проверка прав $this->authorize('update-products', $product);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:products,id',
            'left' => 'required|boolean',
        ]);

        try {
            Product::whereIn('id', $data['ids'])->update(['left' => $data['left']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в левой колонке: '
                . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers.bulk_left_updated_error'),
            ], 500);
        }
    }

    /**
     * Включение Главными
     * Использует Route Model Binding и UpdateMainRequest.
     *
     * @param UpdateMainRequest $request
     * @param Product $product
     * @return RedirectResponse
     */
    public function updateMain(UpdateMainRequest $request, Product $product): RedirectResponse
    {
        // authorize() в UpdateMainRequest
        $validated = $request->validated();

        try {
            $product->main = $validated['main'];
            $product->save();

            Log::info("Обновлено значение активации в главном для товара ID {$product->id}");
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.main_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в главном товара ID {$product->id}: "
                . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.main_updated_error'));
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
        // TODO: Проверка прав $this->authorize('update-products', $product);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:products,id',
            'main' => 'required|boolean',
        ]);

        try {
            Product::whereIn('id', $data['ids'])->update(['main' => $data['main']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в главном: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers.bulk_main_updated_error'),
            ], 500);
        }
    }

    /**
     * Включение Статьи в правом сайдбаре
     * Использует Route Model Binding и UpdateRightRequest.
     *
     * @param UpdateRightRequest $request
     * @param Product $product
     * @return RedirectResponse
     */
    public function updateRight(UpdateRightRequest $request, Product $product): RedirectResponse
    {
        // authorize() в UpdateRightRequest
        $validated = $request->validated();

        try {
            $product->right = $validated['right'];
            $product->save();

            Log::info("Обновлено значение активации в правой колонке для товара ID {$product->id}");
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.right_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления значение в правой колонке товара ID {$product->id}: "
                . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.right_updated_error'));
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
        // TODO: Проверка прав $this->authorize('update-products', $product);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:products,id',
            'right' => 'required|boolean',
        ]);

        try {
            Product::whereIn('id', $data['ids'])->update(['right' => $data['right']]);
            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            Log::error('Ошибка массового обновления активности в правой колонке: '
                . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => __('admin/controllers.bulk_right_updated_error'),
            ], 500);
        }
    }

    /**
     * Обновление статуса активности товара.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Product $product Модель товара для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Product $product): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            $product->activity = $validated['activity'];
            $product->save();

            Log::info("Обновлено activity товара ID {$product->id} на {$product->activity}");
            return back()
                ->with('success', __('admin/controllers.activity_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности товара ID {$product->id}: "
                . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.activity_updated_error'));
        }
    }

    /**
     * Обновление статуса активности массово
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkUpdateActivity(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-products', Product::class);
        $validated = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:products,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();

            // Исправление: используем один запрос whereIn и правильный ключ 'ids'
            Product::whereIn('id', $validated['ids'])
                ->update(['activity' => $validated['activity']]);

            DB::commit();

            Log::info('Массово обновлена активность товаров', [
                'count' => count($validated['ids']),
                'activity' => $validated['activity'],
            ]);

            return back()->with('success', __('admin/controllers.bulk_activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности товаров: " . $e->getMessage());
            return back()->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одного товара.
     * Использует Route Model Binding и UpdateSortEntityRequest.
     *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Product $product Модель товара для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Product $product): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $product->sort = $validated['sort'];
            $product->save();
            Log::info("Обновлено sort товара ID {$product->id} на {$product->sort}");
            return back()
                ->with('success', __('admin/controllers.sort_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки товара ID {$product->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'products'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-products');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'products' => 'required|array',
            'products.*.id' => ['required', 'integer', 'exists:products,id'],
            'products.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['products'] as $productData) {
                // Используем update для массового обновления, если возможно, или where/update
                Product::where('id', $productData['id'])->update(['sort' => $productData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка товаров',
                ['count' => count($validated['products'])]);
            return back()
                ->with('success', __('admin/controllers.bulk_sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки товаров: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

    /**
     * Клонирование товара.
     * Копирует основные поля и связи.
     * Генерирует новые уникальные title и url.
     *
     * @param Request $request (Не используется, но нужен для сигнатуры маршрута)
     * @param Product $product Модель товара для клонирования (через RMB).
     * @return RedirectResponse Редирект на список товаров с сообщением.
     */
    public function clone(Request $request, Product $product): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('create--products', $product);
        DB::beginTransaction();

        try {
            $clonedProduct = $product->replicate();

            // TODO: Обеспечить уникальность title и url с учетом locale
            $clonedProduct->title = $product->title . '-2';
            $clonedProduct->url = $product->url . '-2';
            $clonedProduct->activity = false;
            $clonedProduct->views = 0;
            $clonedProduct->created_at = now();
            $clonedProduct->updated_at = now();
            $clonedProduct->save();

            // Клонируем связи
            $clonedProduct->relatedProducts()->sync($product->relatedProducts()->pluck('id')); // Клонируем связи рекомендаций? Или нет?

            // Клонируем изображения
            $imageSyncData = [];
            foreach ($product->images as $image) {
                $clonedImage = $image->replicate(); // Клонируем запись ProductImage
                $clonedImage->save();
                // Копируем медиафайл
                $originalMedia = $image->getFirstMedia('images');
                if ($originalMedia) {
                    try {
                        $originalMedia->copy($clonedImage, 'images'); // Копируем медиа в новый объект
                        $imageSyncData[$clonedImage->id] = ['order' => $image->pivot->order]; // Сохраняем порядок
                    } catch (Throwable $e) {
                        Log::error("Ошибка копирования медиа при клонировании товара: "
                            . $e->getMessage());
                        // Можно пропустить это изображение или откатить транзакцию
                    }
                }
            }
            $clonedProduct->images()->sync($imageSyncData); // Синхронизируем клонированные изображения

            DB::commit();

            Log::info('Товар ID ' . $product->id . ' успешно клонирован в ID ' . $clonedProduct->id);
            return redirect()->route('admin.products.index')
                ->with('success', __('admin/controllers.cloned_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при клонировании товара ID {$product->id}: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()
                ->with('error', __('admin/controllers.cloned_error'));
        }
    }

    /**
     * Получить все варианты для указанного товара.
     * Возвращает JSON ответ для AJAX запросов.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function getVariants(Product $product): JsonResponse
    {
        // Загружаем варианты и СРАЗУ ЖЕ их изображения
        $variants = $product->variants()
            ->with('images') // Жадная загрузка изображений для вариантов
            ->orderBy('sort', 'asc')
            ->get();

        // Возвращаем их как коллекцию ресурсов
        return response()->json(ProductVariantResource::collection($variants));
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
        $imagesToDelete = ProductImage::whereIn('id', $imageIds)->get();
        foreach ($imagesToDelete as $image) {
            $image->clearMediaCollection('images');
            $image->delete();
        }
        Log::info('Удалены записи ProductImage и их медиа: ', ['image_ids' => $imageIds]);
    }
}
