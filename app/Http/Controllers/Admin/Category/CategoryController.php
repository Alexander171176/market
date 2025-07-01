<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CategoryRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Resources\Admin\Category\CategoryResource;
use App\Http\Resources\Admin\Category\CategorySharedResource;
use App\Models\Admin\Category\Category;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse; // Добавлено для JsonResponse
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{
    protected array $availableLocales = ['ru', 'en', 'kk']; // Обновите список

    /**
     * Отобразить список ресурсов.
     * GET /admin/categories
     * Route: admin.categories.index
     *
     * @param Request $request
     * @return Response
     * @throws AuthorizationException
     */
    public function index(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('show-categories', Category::class);

        $currentLocale = $request->query('locale', config('app.fallback_locale', 'ru'));

        if (!in_array($currentLocale, $this->availableLocales)) {
            $currentLocale = config('app.fallback_locale', 'ru');
            session()->flash('warning', __('admin/controllers/categories.index_locale_error'));
        }

        $categories = collect();
        $categoriesCount = 0;

        try {
            $categories = Category::query()
                ->byLocale($currentLocale)
                ->root()
                ->with(['children' => fn($q) => $q->with(['children' => fn($q2) => $q2->with('children')])])
                ->orderBy('sort')
                ->get();

            $categoriesCount = Category::query()->byLocale($currentLocale)->count();

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки категорий для Index (locale: {$currentLocale}): " . $e->getMessage(), ['exception' => $e]);
            session()->flash('error', __('admin/controllers/categories.index_error'));
        }

        return Inertia::render('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories),
            'categoriesCount' => $categoriesCount,
            'currentLocale' => $currentLocale,
            'availableLocales' => $this->availableLocales,
        ]);
    }

    /**
     * Форма для создания нового ресурса.
     * GET /admin/categories/create
     * Route: admin.categories.create
     *
     * @param Request $request
     * @return Response
     * @throws AuthorizationException
     */
    public function create(Request $request): Response
    {
        // TODO: Проверка прав $this->authorize('create-categories', Category::class);

        $targetLocale = $request->query('locale', config('app.fallback_locale', 'ru'));
        if (!in_array($targetLocale, $this->availableLocales)) {
            $targetLocale = config('app.fallback_locale', 'ru');
        }

        $potentialParents = collect();
        try {
            $potentialParents = Category::query()
                ->byLocale($targetLocale)
                ->orderBy('title')
                ->get(['id', 'title', 'parent_id', 'locale']);

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки родительских категорий для Create (locale: {$targetLocale}): " . $e->getMessage(), ['exception' => $e]);
            session()->flash('error', __('admin/controllers/categories.parent_load_error'));
        }

        return Inertia::render('Admin/Categories/Create', [
            'targetLocale' => $targetLocale,
            'potentialParents' => CategorySharedResource::collection($potentialParents),
            'availableLocales' => $this->availableLocales,
        ]);
    }

    /**
     * Сохранение вновь созданного ресурса в хранилище.
     * POST /admin/categories
     * Route: admin.categories.store
     *
     * @param CategoryRequest $request
     * @return RedirectResponse
     */
    public function store(CategoryRequest $request): RedirectResponse
    {
        // Авторизация выполняется в CategoryRequest->authorize()

        $data = $request->validated();

        try {
            $category = DB::transaction(function () use ($data) {
                if (!isset($data['sort']) || is_null($data['sort'])) {
                    $maxSort = Category::query()
                        ->where('locale', $data['locale'])
                        ->where('parent_id', $data['parent_id'] ?? null)
                        ->max('sort');
                    $data['sort'] = is_null($maxSort) ? 0 : $maxSort + 1;
                }
                $newCategory = Category::create($data);
                Log::info('Категория создана: ', $newCategory->toArray());
                return $newCategory;
            });

            return redirect()->route('admin.categories.index', ['locale' => $category->locale])
                ->with('success', __('admin/controllers/categories.created'));

        } catch (Throwable $e) {
            Log::error("Ошибка при создании категории: " . $e->getMessage(), ['exception' => $e, 'data' => $data]);
            return back()->withInput()->with('error', __('admin/controllers/categories.create_error'));
        }
    }

    /**
     * Отобразить форму для редактирования указанного ресурса.
     * GET /admin/categories/{category}/edit
     * Route: admin.categories.edit
     *
     * @param Request $request
     * @param Category $category
     * @return Response|RedirectResponse
     */
    public function edit(Request $request, Category $category): Response|RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('edit-categories', Category::class);

        $targetLocale = $request->query('locale', config('app.fallback_locale', 'ru'));
        if (!in_array($targetLocale, $this->availableLocales)) {
            Log::warning("Недопустимая локаль '{$targetLocale}' в edit. Используется fallback.");
            $targetLocale = config('app.fallback_locale', 'ru');
        }

        try {
            $potentialParents = Category::query()
                ->byLocale($category->locale) // ← ключевой момент: не targetLocale, а locale самой категории
                ->where('id', '!=', $category->id) // исключить саму категорию
                ->orderBy('title')
                ->get(['id', 'title', 'parent_id', 'locale']);

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки родительских категорий для Edit (category ID: {$category->id}, locale: {$targetLocale}): " . $e->getMessage(), [
                'exception' => $e
            ]);
            return redirect()->route('admin.categories.index', ['locale' => $targetLocale])
                ->with('error', __('admin/controllers/categories.parent_load_error'));
        }

        // Log::info('Потенциальные родители:', $potentialParents->toArray());

        return Inertia::render('Admin/Categories/Edit', [
            'targetLocale' => $targetLocale,
            'category' => new CategoryResource($category->loadMissing('parent')),
            'potentialParents' => CategorySharedResource::collection($potentialParents),
            'availableLocales' => $this->availableLocales,
            'currentLocale' => $category->locale,
        ]);
    }

    /**
     * Обновление указанного ресурса в хранилище.
     * PUT/PATCH /admin/categories/{category}
     * Route: admin.categories.update
     *
     * @param CategoryRequest $request
     * @param Category $category
     * @return RedirectResponse
     */
    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $data = $request->validated();
        $originalParentId = $category->parent_id;
        $originalLocale = $category->locale;
        $categoryId = $category->id; // Сохраняем ID для лога

        try {
            DB::transaction(function () use ($category, $data, $originalParentId, $originalLocale) {
                $recalculateSort = false;

                if (isset($data['parent_id']) && $data['parent_id'] != $originalParentId) {
                    $recalculateSort = true;
                } else if (isset($data['locale']) && $data['locale'] !== $originalLocale) {
                    $recalculateSort = true;
                    Log::warning("Locale changed for category ID {$category->id} from {$originalLocale} to {$data['locale']}");
                }

                if ($recalculateSort && (!isset($data['sort']) || is_null($data['sort']))) {
                    $maxSort = Category::query()
                        ->where('locale', $data['locale'] ?? $originalLocale)
                        ->where('parent_id', $data['parent_id'] ?? null)
                        ->where('id', '!=', $category->id)
                        ->max('sort');
                    $data['sort'] = is_null($maxSort) ? 0 : $maxSort + 1;
                }

                $category->update($data);
            });

            Log::info("Категория обновлена (ID: {$categoryId})", $category->refresh()->toArray());

            return redirect()->route('admin.categories.index', ['locale' => $category->locale])
                ->with('success', __('admin/controllers/categories.updated'));

        } catch (Throwable $e) {
            Log::error("Ошибка при обновлении категории (ID: {$categoryId}): " . $e->getMessage(), ['exception' => $e, 'data' => $data]);
            return back()->withInput()->with('error', __('admin/controllers/categories.update_error'));
        }
    }

    /**
     * Удалить указанный ресурс из хранилища.
     * DELETE /admin/categories/{category}
     * Route: admin.categories.destroy
     *
     * @param Category $category
     * @return RedirectResponse
     */
    public function destroy(Category $category): RedirectResponse
    {

        // TODO: Проверка прав $this->authorize('delete-categories', $category);

        $locale = $category->locale;
        $categoryTitle = $category->title;
        $categoryId = $category->id;

        try {
            DB::transaction(function () use ($category) {
                $category->delete();
            });

            Log::info("Категория '{$categoryTitle}' (ID: {$categoryId}) удалена.");
            return redirect()->route('admin.categories.index', ['locale' => $locale])
                ->with('success', __('admin/controllers/categories.deleted'));

        } catch (Throwable $e) {
            Log::error("Ошибка при удалении категории '{$categoryTitle}' (ID: {$categoryId}): " . $e->getMessage(), ['exception' => $e]);
            return redirect()->route('admin.categories.index', ['locale' => $locale])
                ->with('error', __('admin/controllers/categories.delete_error'));
        }
    }

    /**
     * Обновите статус активности ресурса.
     * PUT /admin/actions/categories/{category}/activity
     * Route: admin.actions.categories.updateActivity
     *
     * @param UpdateActivityRequest $request
     * @param Category $category
     * @return RedirectResponse
     */
    public function updateActivity(UpdateActivityRequest $request, Category $category): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $category->activity = $validated['activity'];
            $category->save();
            DB::commit();

            $action = $category->activity ? __('admin/controllers/categories.activated') : __('admin/controllers/categories.deactivated');
            $message = __('admin/controllers/categories.activity', ['title' => $category->title, 'action' => $action]);
            Log::info("Активность категории '{$category->title}' (ID: {$category->id}) обновлена: {$action}");

            $actionText = $category->activity ? __('admin/controllers/common.activated')
                : __('admin/controllers/common.deactivated');
            return back()
                ->with('success', __('admin/controllers/categories.activity', ['title' => $category->title, 'action' => $actionText]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности категории (ID: {$category->id}): " . $e->getMessage(), ['exception' => $e]);
            return back()->withErrors(['general' => __('admin/controllers/categories.update_activity_error')]);
        }
    }

    /**
     * Обновить статус активности для нескольких категорий.
     * PUT /admin/actions/categories/bulk-activity
     * Route: admin.actions.categories.bulkUpdateActivity
     *
     * @param Request $request
     * @return RedirectResponse|JsonResponse
     * @throws AuthorizationException
     */
    public function bulkUpdateActivity(Request $request): RedirectResponse|JsonResponse
    {
        // TODO: Проверка прав $this->authorize('edit-categories', Category::class);

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:categories,id', // Проверяем, что все ID существуют
            'activity' => 'required|boolean',
        ]);

        $categoryIds = $validated['ids'];
        $activity = $validated['activity'];

        if (empty($categoryIds)) {
            $message = __('admin/controllers/categories.bulk_update_activity_no_selection');
            if ($request->expectsJson()) return response()->json(['message' => $message], 400);
            return back()->with('warning', $message);
        }

        try {
            // Обновляем одним запросом
            $updatedCount = Category::whereIn('id', $categoryIds)->update(['activity' => $activity]);

            $action = $activity ? __('admin/controllers/categories.activated') : __('admin/controllers/categories.deactivated');
            $message = __('admin/controllers/categories.bulk_update_activity_success');
            Log::info($message, ['ids' => $categoryIds, 'activity' => $activity]);

            if ($request->expectsJson()) {
                return response()->json(['message' => $message, 'updatedCount' => $updatedCount]);
            }
            return back()->with('success', $message);

        } catch (Throwable $e) {
            Log::error("Ошибка при массовом обновлении активности категорий: " . $e->getMessage(), ['exception' => $e, 'ids' => $categoryIds]);
            $errorMessage = __('admin/controllers/categories.bulk_update_activity_error');
            if ($request->expectsJson()) {
                return response()->json(['message' => $errorMessage], 500);
            }
            return back()->with('error', $errorMessage);
        }
    }

    /**
     * Обновить значение сортировки для одной категории.
     * PUT /admin/actions/categories/{category}/sort
     * Route: admin.actions.categories.updateSort
     *
     * @param Request $request
     * @param Category $category
     * @return RedirectResponse|JsonResponse
     */
    public function updateSort(Request $request, Category $category): RedirectResponse|JsonResponse
    {
        // TODO: Проверка прав $this->authorize('edit-categories', Category::class);

        $validated = $request->validate([
            'sort' => 'required|integer|min:0',
        ]);

        try {
            $originalSort = $category->sort;
            $newSort = $validated['sort'];

            // TODO: Возможно, нужна логика для "расталкивания" других элементов,
            // если просто присвоить sort, могут появиться дубликаты на одном уровне.
            // Это усложнение, часто для одиночного обновления sort не реализуется.
            $category->sort = $newSort;
            $category->save();

            Log::info("Сортировка категории '{$category->title}' (ID: {$category->id}) изменена с {$originalSort} на {$newSort}");
            $message = __('admin/controllers/categories.order_updated');

            if ($request->expectsJson()) {
                return response()->json(['message' => $message, 'sort' => $category->sort]);
            }
            return back()->with('success', $message);

        } catch (Throwable $e) {
            Log::error("Ошибка при обновлении сортировки категории (ID: {$category->id}): " . $e->getMessage(), ['exception' => $e]);
            $errorMessage = __('admin/controllers/categories.update_sort_error');
            if ($request->expectsJson()) {
                return response()->json(['message' => $errorMessage], 500);
            }
            return back()->with('error', $errorMessage);
        }
    }

    /**
     * Обновление порядка и родительских связей категорий после drag-and-drop.
     * PUT /admin/actions/categories/update-sort-bulk
     * Route: admin.actions.categories.updateSortBulk
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function updateSortBulk(Request $request): JsonResponse|RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('edit-categories', Category::class);

        $categoriesData = $request->input('categories');
        $locale = $request->input('locale');

        if (!is_array($categoriesData) || empty($categoriesData) || !$locale || !in_array($locale, $this->availableLocales)) {
            $message = __('admin/controllers/categories.invalid_input');
            if ($request->expectsJson()) {
                return response()->json(['message' => $message], 400);
            }
            return redirect()->back()->with('error', $message);
        }

        foreach ($categoriesData as $index => $categoryItem) {
            if (!isset($categoryItem['id'], $categoryItem['sort']) || !is_numeric($categoryItem['id']) || !is_numeric($categoryItem['sort'])) {
                $message = __('admin/controllers/categories.invalid_category_ids') . "{$index}.";
                if ($request->expectsJson()) {
                    return response()->json(['message' => $message], 400);
                }
                return redirect()->back()->with('error', $message);
            }
            if (isset($categoryItem['parent_id']) && !is_numeric($categoryItem['parent_id']) && !is_null($categoryItem['parent_id'])) {
                $message = __('admin/controllers/categories.invalid_parent_ids') . "{$index}.";
                if ($request->expectsJson()) {
                    return response()->json(['message' => $message], 400);
                }
                return redirect()->back()->with('error', $message);
            }
        }

        $categoryIds = array_column($categoriesData, 'id');

        try {
            DB::transaction(function () use ($categoriesData, $locale, $categoryIds) {
                $existingCategoriesCount = Category::query()->whereIn('id', $categoryIds)->where('locale', $locale)->count();
                if ($existingCategoriesCount !== count($categoryIds)) {
                    throw new \InvalidArgumentException(__('admin/controllers/categories.invalid_category_ids'));
                }

                $parentIds = array_filter(array_unique(array_column($categoriesData, 'parent_id')));
                if (!empty($parentIds)) {
                    $existingParentsCount = Category::query()->whereIn('id', $parentIds)->where('locale', $locale)->count();
                    if ($existingParentsCount !== count($parentIds)) {
                        throw new \InvalidArgumentException(__('admin/controllers/categories.invalid_parent_ids'));
                    }
                    foreach ($categoriesData as $categoryItem) {
                        if (!is_null($categoryItem['parent_id']) && $categoryItem['id'] == $categoryItem['parent_id']) {
                            throw new \InvalidArgumentException(__('admin/controllers/categories.parent_loop_error') . " (ID: {$categoryItem['id']})");
                        }
                    }
                }

                foreach ($categoriesData as $categoryItem) {
                    Category::query()
                        ->where('id', $categoryItem['id'])
                        ->update([
                            'sort' => (int)$categoryItem['sort'],
                            'parent_id' => isset($categoryItem['parent_id']) ? (int)$categoryItem['parent_id'] : null,
                        ]);
                }
            });

            $message = __('admin/controllers/categories.order_updated');
            Log::info("Порядок категорий для локали '{$locale}' обновлен.", ['ids' => $categoryIds]);

            if ($request->expectsJson()) {
                return response()->json(['message' => $message]);
            }
            return redirect()->back()->with('success', $message);

        } catch (\InvalidArgumentException $e) {
            $message = $e->getMessage();
            Log::warning("Ошибка валидации при обновлении порядка категорий (locale: {$locale}): {$message}", ['data' => $categoriesData]);

            if ($request->expectsJson()) {
                return response()->json(['message' => $message], 400);
            }
            return redirect()->back()->with('error', $message);

        } catch (Throwable $e) {
            $message = __('admin/controllers/categories.bulk_update_sort_error');
            Log::error("Ошибка при обновлении порядка категорий (locale: {$locale}): " . $e->getMessage(), ['exception' => $e, 'data' => $categoriesData]);

            if ($request->expectsJson()) {
                return response()->json(['message' => $message], 500);
            }
            return redirect()->back()->with('error', $message);
        }
    }

}
