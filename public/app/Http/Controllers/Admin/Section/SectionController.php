<?php

namespace App\Http\Controllers\Admin\Section;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Section\SectionRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\UpdateSortEntityRequest;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Http\Resources\Admin\Rubric\RubricSharedResource;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Rubric\Rubric;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

/**
 * Контроллер для управления Секциями в административной панели.
 *
 * Предоставляет CRUD операции, а также дополнительные действия:
 * - Массовое удаление
 * - Обновление активности и сортировки (одиночное и массовое)
 * - Клонирование
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \App\Models\Admin\Section\Section Модель Секции
 * @see \App\Http\Requests\Admin\Section\SectionRequest Запрос для создания/обновления
 */
class SectionController extends Controller
{
    /**
     * Отображение списка всех Секций.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-sections', Section::class);

        // Получаем настройки для фронтенда (дефолтные значения)
        $adminCountSections = config('site_settings.AdminCountSections', 15);
        $adminSortSections = config('site_settings.AdminSortSections', 'idDesc');

        try {
            $sections = Section::all();
            $sectionsCount = Section::count(); // Считаем из загруженной коллекции

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки секций для Index: " . $e->getMessage());
            $sections = collect(); // Пустая коллекция в случае ошибки
            $sectionsCount = 0;
            session()->flash('error', 'Не удалось загрузить список секций.');
        }

        return Inertia::render('Admin/Sections/Index', [
            'sections' => SectionResource::collection($sections),
            'sectionsCount' => $sectionsCount,
            'adminCountSections' => (int)$adminCountSections,
            'adminSortSections' => $adminSortSections,
        ]);
    }

    /**
     * Отображение формы создания новой секции.
     * Передает список рубрик для выбора.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-sections', Section::class);

        return Inertia::render('Admin/Sections/Create');
    }

    /**
     * Сохранение новой секции в базе данных.
     * Использует SectionRequest для валидации и авторизации.
     * Синхронизирует связанные рубрики.
     *
     * @param SectionRequest $request
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function store(SectionRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $section = Section::create($data);
            DB::commit();

            Log::info('Секция успешно создана: ', $section->toArray());
            return redirect()->route('admin.sections.index')->with('success', __('admin/controllers/sections.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании секции: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/sections.create_error')]);
        }
    }

    /**
     * Отображение формы редактирования существующей секции.
     * Использует Route Model Binding для получения модели.
     *
     * @param Section $section Модель секции, найденная по ID из маршрута.
     * @return Response
     */
    public function edit(Section $section): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('update-sections', $section);

        return Inertia::render('Admin/Sections/Edit', [
            'section' => new SectionResource($section),
        ]);
    }

    /**
     * Обновление существующей секции в базе данных.
     * Использует SectionRequest и Route Model Binding.
     * Синхронизирует связанные рубрики, если они переданы.
     *
     * @param SectionRequest $request Валидированный запрос.
     * @param Section $section Модель рубрики для обновления.
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function update(SectionRequest $request, Section $section): RedirectResponse // Используем RMB
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $section->update($data);
            DB::commit();

            Log::info('Секция обновлена: ', $section->toArray());
            return redirect()->route('admin.sections.index')->with('success', __('admin/controllers/sections.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении секции ID {$section->id}: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/sections.update_error')]);
        }
    }

    /**
     * Удаление указанной секции.
     * Использует Route Model Binding. Связи удаляются каскадно.
     *
     * @param Section $section Модель секции для удаления.
     * @return RedirectResponse Редирект на список секций с сообщением.
     */
    public function destroy(Section $section): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав доступа $this->authorize('delete-sections', $section);
        try {
            DB::beginTransaction();
            // Связи (articles, banners, videos) удалятся каскадно из pivot таблиц
            $section->delete();
            DB::commit();

            Log::info('Секция удалена: ID ' . $section->id);
            return redirect()->route('admin.sections.index')->with('success', __('admin/controllers/sections.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении секции ID {$section->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/sections.delete_error')]);
        }
    }

    /**
     * Массовое удаление указанных секций.
     * Принимает массив ID в теле запроса.
     *
     * @param Request $request Запрос, содержащий массив 'ids'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('delete-sections');
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:sections,id', // Улучшена валидация
        ]);

        $sectionIds = $validated['ids'];
        $count = count($sectionIds); // Получаем количество для сообщения

        try {
            DB::beginTransaction(); // Оставляем транзакцию для массовой операции
            Section::whereIn('id', $sectionIds)->delete(); // Используем delete()
            DB::commit();

            Log::info('Секции удалены: ', $sectionIds);
            return redirect()->route('admin.sections.index')
                ->with('success', __('admin/controllers/sections.bulk_deleted', ['count' => $count]));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при массовом удалении секций: " . $e->getMessage(), ['ids' => $sectionIds]);
            return back()->withErrors(['general' => __('admin/controllers/sections.bulk_delete_error')]);
        }
    }

    /**
     * Обновление статуса активности секции.
     * Использует Route Model Binding и UpdateActivityRequest.
     *
     * @param UpdateActivityRequest $request Валидированный запрос с полем 'activity'.
     * @param Section $section Модель секции для обновления.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateActivity(UpdateActivityRequest $request, Section $section): RedirectResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $section->activity = $validated['activity'];
            $section->save();
            DB::commit();

            Log::info("Обновлено activity секции ID {$section->id} на {$section->activity}");
            $actionText = $section->activity ? __('admin/controllers/common.activated')
                : __('admin/controllers/common.deactivated');
            return back()
                ->with('success', __('admin/controllers/sections.activity', ['title' => $section->title, 'action' => $actionText]));

        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности секции ID {$section->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/sections.update_activity_error')]);
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
        // TODO: Проверка прав доступа $this->authorize('update-sections', Section::class);
        $data = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:sections,id',
            'activity' => 'required|boolean',
        ]);

        Rubric::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);

        return response()->json(['success' => true]);
    }

    /**
     * Обновление значения сортировки для одной секции.
     * Использует Route Model Binding и UpdateSortRequest.
     * *
     * @param UpdateSortEntityRequest $request Валидированный запрос с полем 'sort'.
     * @param Section $section Модель секции для обновления.
     * @return RedirectResponse Редирект назад с сообщением..
     */
    public function updateSort(UpdateSortEntityRequest $request, Section $section): RedirectResponse
    {
        // authorize() в UpdateSortEntityRequest
        $validated = $request->validated();

        try {
            $section->sort = $validated['sort'];
            $section->save();
            Log::info("Обновлено sort секции ID {$section->id} на {$section->sort}");
            return back();

        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки секции ID {$section->id}: " . $e->getMessage());
            return back()->withErrors(['sort' => __('admin/controllers/sections.update_sort_error')]);
        }
    }

    /**
     * Массовое обновление сортировки на основе переданного порядка ID.
     * Принимает массив объектов вида `[{id: 1, sort: 10}, {id: 5, sort: 20}]`.
     *
     * @param Request $request Запрос с массивом 'sections'.
     * @return RedirectResponse Редирект назад с сообщением.
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        // TODO: Проверка прав доступа $this->authorize('update-sections', Section::class);

        // Валидируем входящий массив (Можно вынести в отдельный FormRequest: UpdateSortBulkRequest)
        $validated = $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => ['required', 'integer', 'exists:sections,id'],
            'sections.*.sort' => ['required', 'integer', 'min:1'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['sections'] as $sectionData) {
                // Используем update для массового обновления, если возможно, или where/update
                Section::where('id', $sectionData['id'])->update(['sort' => $sectionData['sort']]);
            }
            DB::commit();

            Log::info('Массово обновлена сортировка рубрик', ['count' => count($validated['sections'])]);
            return back();

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка массового обновления сортировки рубрик: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/sections.bulk_update_sort_error')]);
        }
    }

    /**
     * Клонирование секции.
     * Копирует основные поля и связи с рубриками.
     * Генерирует новые уникальные title и url.
     *
     * @param Request $request (Не используется, но нужен для сигнатуры маршрута)
     * @param Section $section Модель рубрики для клонирования (через RMB).
     * @return RedirectResponse Редирект на список рубрик с сообщением.
     */
    public function clone(Request $request, Section $section): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('create-sections', $section);
        DB::beginTransaction();
        try {
            $clonedSection = $section->replicate();
            $clonedSection->title = $section->title . '-2';
            $clonedSection->activity = false;
            $clonedSection->created_at = now();
            $clonedSection->updated_at = now();
            $clonedSection->save(); // Сохраняем клон
            DB::commit();

            Log::info('Секция ID ' . $section->id . ' успешно клонирована в ID ' . $clonedSection->id);
            return redirect()->route('admin.sections.index')->with('success', __('admin/controllers/sections.cloned'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при клонировании секции ID {$section->id}: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withInput()->withErrors(['general' => __('admin/controllers/sections.clone_error')]);
        }
    }
}
