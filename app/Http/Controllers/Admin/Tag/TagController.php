<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\TagRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Requests\Admin\UpdateSortRequest;
use App\Http\Resources\Admin\Tag\TagResource;
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
 * Контроллер для управления Тегами в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Tag\Tag Модель Тега
 * @see \App\Http\Requests\Admin\Tag\TagRequest Запрос для создания/обновления
 */
class TagController extends Controller
{
    /**
     * Отображение списка всех Тегов.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-tags', Tag::class);

        $adminCountTags = config('site_settings.AdminCountTags', 15);
        $adminSortTags = config('site_settings.AdminSortTags', 'idAsc'); // idAsc по умолчанию

        try {
            $tags = Tag::all();
            $tagsCount = Tag::count();
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки тегов для Index: " . $e->getMessage());
            $tags = collect(); // Пустая коллекция в случае ошибки
            $tagsCount = 0;
            session()->flash('error', __('admin/controllers/tags.index_error'));
        }

        return Inertia::render('Admin/Tags/Index', [
            'tags' => TagResource::collection($tags),
            'tagsCount' => $tagsCount,
            'adminCountTags' => (int)$adminCountTags,
            'adminSortTags' => $adminSortTags,
        ]);
    }

    /**
     * Отображение формы создания нового тега.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-tags', Tag::class);
        return Inertia::render('Admin/Tags/Create');
    }

    /**
     * Сохранение нового тега в базе данных.
     * Использует TagRequest для валидации и авторизации.
     *
     * @param TagRequest $request
     * @return RedirectResponse Редирект на список тегов с сообщением.
     */
    public function store(TagRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $tag = Tag::create($data);
            DB::commit();

            Log::info('Тег создан: ', $tag->toArray());
            return redirect()->route('admin.tags.index')->with('success', __('admin/controllers/tags.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании тега: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/tags.create_error')]);
        }
    }

    /**
     * Отображение формы редактирования существующего тега.
     * Использует Route Model Binding для получения модели.
     *
     * @param Tag $tag Модель тега, найденный по ID из маршрута.
     * @return Response
     */
    public function edit(Tag $tag): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('edit-tags', $tag);

        return Inertia::render('Admin/Tags/Edit', [
            'tag' => new TagResource($tag), // Передаем ресурс тега
        ]);
    }

    /**
     * Обновление существующего тега в базе данных.
     * Использует TagRequest и Route Model Binding.
     *
     * @param TagRequest $request Валидированный запрос.
     * @param Tag $tag Модель тега для обновления.
     * @return RedirectResponse Редирект на список тегов с сообщением.
     */
    public function update(TagRequest $request, Tag $tag): RedirectResponse // Используем RMB
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $tag->update($data);
            DB::commit();

            Log::info('Тег обновлен: ', $tag->toArray());
            return redirect()->route('admin.tags.index')->with('success', __('admin/controllers/tags.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении тега ID {$tag->id}: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/tags.update_error')]);
        }
    }

    /**
     * Удаление указанного тега.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Tag $tag Модель тега для удаления.
     * @return RedirectResponse Редирект на список тегов с сообщением.
     */
    public function destroy(Tag $tag): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('delete-tags', $tag);
        try {
            DB::beginTransaction();
            $tag->delete();
            DB::commit();

            Log::info('Тег удален: ID ' . $tag->id);
            return redirect()->route('admin.tags.index')->with('success', __('admin/controllers/tags.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении тега ID {$tag->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/tags.delete_error')]);
        }
    }

    /**
     * Массовое удаление указанных рубрик.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-tags');
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:tags,id',
        ]);

        $tagIds = $validated['ids'];
        $count = count($tagIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции
            Tag::whereIn('id', $tagIds)->delete();
            DB::commit();

            Log::info('Теги удалены: ', $tagIds);
            return redirect()->route('admin.tags.index')
                ->with('success', __('admin/controllers/tags.bulk_deleted', ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении тегов: " . $e->getMessage(), ['ids' => $tagIds]);
            return back()->withErrors(['general' => __('admin/controllers/tags.bulk_delete_error')]);
        }
    }

    /**
     * Обновление статуса активности тега.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Tag $tag Модель тега для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Tag $tag): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $tag->activity = $validated['activity'];
            $tag->save();
            DB::commit();

            Log::info("Обновлено activity тега ID {$tag->id} на {$tag->activity}");
            $actionText = $tag->activity ? __('admin/controllers/common.activated')
                : __('admin/controllers/common.deactivated');
            return back()
                ->with('success', __('admin/controllers/tags.activity', ['title' => $tag->title, 'action' => $actionText]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности тега ID {$tag->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/tags.update_activity_error')]);
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
        // TODO: Проверка прав $this->authorize('edit-tags', Tag::class);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:tags,id',
            'activity' => 'required|boolean',
        ]);

        Tag::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);

        return back()->response()->json(['success' => true]);
    }

    /**
     * Обновление значения сортировки для одного тега.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Tag $tag Модель тега для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Tag $tag): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $tag->sort = $validated['sort'];
            $tag->save();
            Log::info("Обновлено sort тега ID {$tag->id} на {$tag->sort}");
            return back();

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки тега ID {$tag->id}: " . $e->getMessage());
            return back()->withErrors(['sort' => __('admin/controllers/tags.update_sort_error')]);
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'tags'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-tags');

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'tags' => 'required|array',
            'tags.*.id' => ['required', 'integer', 'exists:tags,id'],
            'tags.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['tags'] as $tagData) {
                // Используем update для массового обновления, если возможно, или where/update
                Tag::where('id', $tagData['id'])->update(['sort' => $tagData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка тегов', ['count' => count($validated['tags'])]);
            return back();

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки тегов: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/tags.bulk_update_sort_error')]);
        }
    }
}
