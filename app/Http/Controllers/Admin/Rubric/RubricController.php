<?php

namespace App\Http\Controllers\Admin\Rubric;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Rubric\RubricRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Resources\Admin\Rubric\RubricResource;
use App\Http\Resources\Admin\Section\SectionSharedResource;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Section\Section;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Рубриками в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 * - Клонирование
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Rubric\Rubric Модель Рубрики
 * @see \App\Http\Requests\Admin\Rubric\RubricRequest Запрос для создания/обновления
 */
class RubricController extends Controller
{
    /**
     * Отображение списка всех Рубрик.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        $adminCountRubrics = config('site_settings.AdminCountRubrics', 15);
        $adminSortRubrics  = config('site_settings.AdminSortRubrics', 'idDesc');

        try {
            // Вместо withCount загружаем с секциями
            $rubrics = Rubric::with('sections')->get();
            $rubricsCount = $rubrics->count();

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки рубрик для Index: " . $e->getMessage());
            $rubrics = collect();
            $rubricsCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Rubrics/Index', [
            'rubrics' => RubricResource::collection($rubrics),
            'rubricsCount' => $rubricsCount,
            'adminCountRubrics' => (int)$adminCountRubrics,
            'adminSortRubrics' => $adminSortRubrics,
        ]);
    }

    /**
     * Отображение формы создания новой рубрики.
     * Передает список секций для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав доступа $this->authorize('create-rubrics', Rubric::class);
        $sections = Section::select('id', 'title', 'locale')->orderBy('title')->get();

        return Inertia::render('Admin/Rubrics/Create', [
            'sections' => SectionSharedResource::collection($sections),
        ]);
    }

    /**
     * Сохранение новой рубрики в базе данных.
     * Использует RubricRequest для валидации и авторизации.
     *
     * @param RubricRequest $request
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function store(RubricRequest $request): RedirectResponse
    {
        // authorize() уже выполнен в RubricRequest
        $data = $request->validated();
        $sectionIds = collect($data['sections'] ?? [])->pluck('id')->toArray();
        unset($data['sections']);

        try {
            DB::beginTransaction();
            $rubric = Rubric::create($data);
            $rubric->sections()->sync($sectionIds);
            DB::commit();

            Log::info('Рубрика успешно создана: ', $rubric->toArray());
            return redirect()->route('admin.rubrics.index')
                ->with('success', __('admin/controllers.created_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании рубрики: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()
                ->with('error', __('admin/controllers.created_error'));
        }
    }

    /**
     * Отображение формы редактирования существующей рубрики.
     * Использует Route Model Binding для получения модели.
     *
     * @param Rubric $rubric Модель рубрики, найденная по ID из маршрута.
     * @return Response
     */
    public function edit(Rubric $rubric): Response // Используем Route Model Binding
    {
        // TODO: Проверка прав доступа $this->authorize('update-rubrics', $rubric);

        $rubric->load('sections');
        $sections = Section::select('id', 'title', 'locale')->orderBy('title')->get();

        return Inertia::render('Admin/Rubrics/Edit', [
            'rubric' => new RubricResource($rubric),
            'sections' => SectionSharedResource::collection($sections),
        ]);
    }

    /**
     * Обновление существующей рубрики в базе данных.
     * Использует RubricRequest и Route Model Binding.
     * Синхронизирует связанные секции, если они переданы.
     *
     * @param RubricRequest $request Валидированный запрос.
     * @param Rubric $rubric Модель рубрики для обновления.
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function update(RubricRequest $request, Rubric $rubric): RedirectResponse // Используем RMB
    {
        // authorize() уже выполнен в RubricRequest
        $data = $request->validated();
        $sectionData = $data['sections'] ?? null;
        unset($data['sections']);

        try {
            DB::beginTransaction();
            $rubric->update($data);
            if ($sectionData !== null) {
                $sectionIds = collect($sectionData)->pluck('id')->toArray();
                $rubric->sections()->sync($sectionIds);
            }
            DB::commit();

            Log::info('Рубрика обновлена: ', $rubric->toArray());
            return redirect()->route('admin.rubrics.index')
                ->with('success', __('admin/controllers.updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении рубрики ID {$rubric->id}: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()
                ->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление указанной рубрики.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Rubric $rubric Модель рубрики для удаления.
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function destroy(Rubric $rubric): RedirectResponse
    {
        // TODO: Проверка прав доступа $this->authorize('delete-rubrics', $rubric);
        try {
            DB::beginTransaction();
            $rubricTitle = $rubric->title;
            $rubricId = $rubric->id;
            $rubric->delete();
            DB::commit();

            Log::info("Рубрика удалена: ID {$rubricId}, Title: {$rubricTitle}");
            return redirect()->route('admin.rubrics.index')
                ->with('success', __('admin/controllers.deleted_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении рубрики ID {$rubric->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.deleted_error'));
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
        // TODO: Проверка прав $this->authorize('delete-rubrics');

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:rubrics,id',
        ]);

        $rubricIds = $validated['ids'];
        $count = count($rubricIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции
            Rubric::whereIn('id', $rubricIds)->delete();
            DB::commit();

            Log::info('Рубрики удалены: ', $rubricIds);
            return redirect()->route('admin.rubrics.index')
                ->with('success', __('admin/controllers.bulk_deleted_success',
                    ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении рубрик: "
                . $e->getMessage(), ['ids' => $rubricIds]);
            return back()
                ->with('error', __('admin/controllers.bulk_deleted_error'));
        }
    }

    /**
     * Обновление статуса активности рубрики.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Rubric $rubric Модель рубрики для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Rubric $rubric): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $rubric->activity = $validated['activity'];
            $rubric->save();
            DB::commit();

            Log::info("Обновлено activity рубрики ID {$rubric->id} на {$rubric->activity}");

            return back()
                ->with('success', __('admin/controllers.activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка обновления активности рубрики ID {$rubric->id}: " . $e->getMessage());
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
        // TODO: Проверка прав доступа $this->authorize('update-rubrics', Rubric::class);
        $validated = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:rubrics,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['rubrics'] as $rubricData) {
                // Используем update для массового обновления, если возможно, или where/update
                Rubric::where('id', $rubricData['id'])->update(['activity' => $rubricData['activity']]);
            }
            DB::commit();

            Log::info('Массово обновлена активность',
                ['count' => count($validated['rubrics'])]);
            return back()
                ->with('success', __('admin/controllers.bulk_activity_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления активности: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.bulk_activity_updated_error'));
        }
    }

    /**
     * Обновление значения сортировки для одной рубрики.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Rubric $rubric Модель рубрики для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Rubric $rubric): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $rubric->sort = $validated['sort'];
            $rubric->save();

            Log::info("Обновлено sort рубрики ID {$rubric->id} на {$rubric->sort}");
            return back()
                ->with('success', __('admin/controllers.sort_updated_success'));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки рубрики ID {$rubric->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.sort_updated_error'));
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'rubrics'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-rubrics', Rubric::class);

        // Валидируем входящий массив
        // (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'rubrics' => 'required|array',
            'rubrics.*.id' => ['required', 'integer', 'exists:rubrics,id'],
            'rubrics.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['rubrics'] as $rubricData) {
                // Используем update для массового обновления, если возможно, или where/update
                Rubric::where('id', $rubricData['id'])->update(['sort' => $rubricData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка рубрик',
                ['count' => count($validated['rubrics'])]);
            return back()
                ->with('success', __('admin/controllers.bulk_sort_updated_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки рубрик: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.bulk_sort_updated_error'));
        }
    }

    /**
     * Клонирование рубрики.
     * Копирует основные поля и связи с секциями.
     * Генерирует новые уникальные title и url.
     *
     * @param Request $request (Не используется, но нужен для сигнатуры маршрута)
     * @param Rubric $rubric Модель рубрики для клонирования (через RMB).
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function clone(Request $request, Rubric $rubric): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('create-rubrics', $rubric);

        DB::beginTransaction();
        try {
            $clonedRubric = $rubric->replicate();
            $clonedRubric->title = $rubric->title . '-2';
            $clonedRubric->url = $rubric->url . '-2';
            $clonedRubric->activity = false;
            $clonedRubric->views = 0;
            $clonedRubric->created_at = now();
            $clonedRubric->updated_at = now();
            $clonedRubric->save(); // Сохраняем клон

            $sectionIds = $rubric->sections()->pluck('id')->toArray();
            $clonedRubric->sections()->sync($sectionIds);

            DB::commit();

            Log::info('Рубрика ID ' . $rubric->id . ' успешно клонирована в ID ' . $clonedRubric->id);
            return redirect()->route('admin.rubrics.index')
                ->with('success', __('admin/controllers.cloned_success'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при клонировании рубрики ID {$rubric->id}: "
                . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()
                ->with('error', __('admin/controllers.cloned_error'));
        }
    }

}
