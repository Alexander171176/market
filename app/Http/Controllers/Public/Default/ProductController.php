<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Models\Admin\Product\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * @param $product
     * @return Response
     */
    public function show($product): Response
    {
        $locale = app()->getLocale();

        $product = Product::where('url', $product)
            ->where('locale', $locale)
            ->where('activity', true)
            ->firstOrFail();

        // Увеличиваем количество просмотров на 1
        $product->increment('views');

        return Inertia::render('Public/Default/Products/Show', [
            'product' => $product,
        ]);
    }
}
