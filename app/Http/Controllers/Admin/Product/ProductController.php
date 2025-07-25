<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Product\ProductResource;
use App\Models\Admin\Product\Product;
use Illuminate\Http\Request;
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
            session()->flash('error', __('admin/controllers/products.index_error'));
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => ProductResource::collection($products),
            'productsCount' => $productsCount,
            'adminCountProducts' => (int)$adminCountProducts,
            'adminSortProducts' => $adminSortProducts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
