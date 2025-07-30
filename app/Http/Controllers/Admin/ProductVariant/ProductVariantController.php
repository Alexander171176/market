<?php

namespace App\Http\Controllers\Admin\ProductVariant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductVariant\ProductVariantRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Resources\Admin\ProductVariant\ProductVariantResource;
use App\Models\Admin\ProductVariant\ProductVariant;
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

        try {
            DB::beginTransaction();

            $variant = ProductVariant::create($data);

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
     * Получение данных одного варианта (для редактирования)
     *
     * @param ProductVariant $product_variant
     * @return ProductVariantResource
     */
    public function show(ProductVariant $product_variant): ProductVariantResource
    {
        return new ProductVariantResource(
            $product_variant->load(['images', 'propertyValues'])
        );
    }

    /**
     * Обновление существующего варианта товара
     *
     * @param ProductVariantRequest $request
     * @param ProductVariant $product_variant
     * @return JsonResponse
     */
    public function update(ProductVariantRequest $request, ProductVariant $product_variant): JsonResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();

            $product_variant->update($data);

            DB::commit();
            Log::info('Вариант товара обновлён', ['id' => $product_variant->id]);

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

}
