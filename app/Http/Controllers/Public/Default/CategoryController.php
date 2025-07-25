<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * @param $category
     * @return Response
     */
    public function show($category): Response
    {
        $locale = app()->getLocale();

        $category = Category::where('url', $category)
            ->where('locale', $locale)
            ->where('activity', true)
            ->firstOrFail();

        // Увеличиваем количество просмотров на 1
        $category->increment('views');

        return Inertia::render('Public/Default/Categories/Show', [
            'category' => $category,
        ]);
    }
}
