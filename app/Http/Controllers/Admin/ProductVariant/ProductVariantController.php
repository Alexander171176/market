<?php

namespace App\Http\Controllers\Admin\ProductVariant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductVariant\ProductVariantRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Resources\Admin\ProductVariant\ProductVariantResource;
use App\Models\Admin\ProductVariant\ProductVariant;
use App\Models\Admin\ProductVariant\ProductVariantImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Контроллер для управления ВариантамиТоварами в административной панели.
 *
 * Предоставляет CRUD операции
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see ProductVariant Модель Варианта товара
 * @see ProductVariantRequest Запрос для создания/обновления
 */
class ProductVariantController extends Controller
{
    /**
     * Сохранение нового варианта товара
     *
     * @param ProductVariantRequest $request
     * @return JsonResponse
     */
    public function store(ProductVariantRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Извлекаем данные по изображениям
        $imagesData = $data['images'] ?? [];
        unset($data['images']); // Убираем из основного массива данных

        try {
            DB::beginTransaction();

            // 1. Создаем сам вариант товара
            $variant = ProductVariant::create($data);

            // 2. Обработка и привязка изображений, если они есть
            if (!empty($imagesData)) {
                $syncData = [];
                foreach ($imagesData as $index => $imageData) {
                    $fileKey = "images.{$index}.file";

                    if ($request->hasFile($fileKey)) {
                        // Создаем запись об изображении
                        $newImage = ProductVariantImage::create([
                            'order'   => $imageData['order'] ?? 0,
                            'alt'     => $imageData['alt'] ?? '',
                            'caption' => $imageData['caption'] ?? '',
                        ]);

                        // Прикрепляем файл с помощью Spatie MediaLibrary
                        $newImage->addMedia($request->file($fileKey))
                            ->toMediaCollection('images');

                        // Готовим данные для синхронизации с pivot-таблицей
                        $syncData[$newImage->id] = ['order' => $newImage->order];
                    }
                }
                // 3. Синхронизируем изображения с вариантом
                $variant->images()->sync($syncData);
            }

            DB::commit();
            Log::info('Вариант товара создан', ['id' => $variant->id]);

            return response()->json([
                'success' => true,
                'variant' => new ProductVariantResource($variant),
            ], 201);

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка при создании варианта товара: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании варианта товара.',
            ], 500);
        }
    }

    /**
     * Обновление существующего варианта товара вместе с изображениями.
     *
     * @param ProductVariantRequest $request
     * @param ProductVariant $product_variant
     * @return JsonResponse
     */
    public function update(ProductVariantRequest $request, ProductVariant $product_variant): JsonResponse
    {
        $data = $request->validated();

        // Извлекаем данные по изображениям
        $imagesData = $data['images'] ?? [];
        $deletedImageIds = $data['deletedImages'] ?? [];

        // Убираем ненужные ключи из основного массива данных
        unset($data['images'], $data['deletedImages'], $data['_method']);

        try {
            DB::beginTransaction();

            // 1. Удаляем изображения, отмеченные для удаления
            if (!empty($deletedImageIds)) {
                $product_variant->images()->detach($deletedImageIds);
                $this->deleteVariantImages($deletedImageIds);
            }

            // 2. Обновляем основные поля варианта
            $product_variant->update($data);

            // 3. Обработка новых и существующих изображений
            $syncData = [];
            foreach ($imagesData as $index => $imageData) {
                $fileKey = "images.{$index}.file";

                // а) Обновляем существующее изображение
                if (!empty($imageData['id'])) {
                    $image = ProductVariantImage::find($imageData['id']);
                    if ($image && !in_array($image->id, $deletedImageIds, true)) {
                        $image->update([
                            'order'   => $imageData['order'] ?? $image->order,
                            'alt'     => $imageData['alt'] ?? $image->alt,
                            'caption' => $imageData['caption'] ?? $image->caption,
                        ]);

                        // Если пришел новый файл для замены
                        if ($request->hasFile($fileKey)) {
                            $image->clearMediaCollection('images');
                            $image->addMedia($request->file($fileKey))
                                ->toMediaCollection('images');
                        }
                        $syncData[$image->id] = ['order' => $image->order];
                    }
                    // б) Добавляем новое изображение
                } elseif ($request->hasFile($fileKey)) {
                    $newImage = ProductVariantImage::create([
                        'order'   => $imageData['order'] ?? 0,
                        'alt'     => $imageData['alt'] ?? '',
                        'caption' => $imageData['caption'] ?? '',
                    ]);
                    $newImage->addMedia($request->file($fileKey))
                        ->toMediaCollection('images');

                    $syncData[$newImage->id] = ['order' => $newImage->order];
                }
            }

            // 4. Синхронизируем pivot-таблицу для изображений
            $product_variant->images()->sync($syncData);

            DB::commit();
            Log::info('Вариант товара обновлён', ['id' => $product_variant->id]);

            // Загружаем обновленный вариант со связями для ответа
            $product_variant->load('images');

            return response()->json([
                'success' => true,
                'variant' => new ProductVariantResource($product_variant),
            ]);

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Ошибка при обновлении варианта товара: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении варианта товара.',
            ], 500);
        }
    }

    /**
     * Удаление варианта товара
     *
     * @param ProductVariant $product_variant
     * @return JsonResponse
     */
    public function destroy(ProductVariant $product_variant): JsonResponse
    {
        try {
            $product_variant->delete();

            Log::info('Вариант товара удалён', ['id' => $product_variant->id]);

            return response()->json(['success' => true]);

        } catch (Throwable $e) {
            Log::error('Ошибка при удалении варианта товара: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении варианта товара.',
            ], 500);
        }
    }

    /**
     * Обновление статуса активности Варианта товара.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param ProductVariant $productVariant Модель Варианта товара для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, ProductVariant $productVariant): RedirectResponse
    {
        // Валидация и авторизация в UpdateActivityRequest
        $validated = $request->validated();

        try {
            $productVariant->activity = $validated['activity'];
            $productVariant->save();

            Log::info("Обновлено activity варианта товара ID {$productVariant->id}
            на {$productVariant->activity}");

            return back()
                ->with('success', __('admin/controllers.activity_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности варианта товара ID {$productVariant->id}: "
                . $e->getMessage());

            return back()
                ->with('error', __('admin/controllers.activity_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав, если требуется:
        // $this->authorize('update-product-variants');

        // Валидация входящего массива
        $validated = $request->validate([
            'product_variants' => 'required|array',
            'product_variants.*.id' => ['required', 'integer', 'exists:product_variants,id'],
            'product_variants.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['product_variants'] as $variantData) {
                ProductVariant::where('id', $variantData['id'])->update([
                    'sort' => $variantData['sort'],
                ]);
            }

            DB::commit();

            Log::info('Массово обновлена сортировка вариантов товаров', [
                'count' => count($validated['product_variants']),
            ]);

            return back()->with('success', __('admin/controllers.bulk_sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();

            Log::error("Ошибка массового обновления сортировки вариантов товаров: "
                . $e->getMessage());

            return back()->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

    /**
     * Приватный метод для удаления изображений варианта товара.
     *
     * @param array $imageIds
     * @return void
     */
    private function deleteVariantImages(array $imageIds): void
    {
        if (empty($imageIds)) return;

        $imagesToDelete = ProductVariantImage::whereIn('id', $imageIds)->get();
        foreach ($imagesToDelete as $image) {
            $image->clearMediaCollection('images'); // Удаление файлов через Spatie
            $image->delete(); // Удаление записи из таблицы
        }
        Log::info('Удалены изображения варианта товара: ', ['image_ids' => $imageIds]);
    }

}
