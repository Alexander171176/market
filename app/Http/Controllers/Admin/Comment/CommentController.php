<?php

namespace App\Http\Controllers\Admin\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Comment\CommentRequest;
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Resources\Admin\Comment\CommentResource;
use App\Models\Admin\Comment\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CommentController extends Controller
{
    /**
     * Отображение списка всех комментариев (или с фильтрами).
     */
    public function index(Request $request): Response // Добавляем Request для фильтров/сортировки
    {
        // TODO: Проверка прав $this->authorize('show-comments', Comment::class);

        // Получаем настройки пагинации и сортировки
        $adminCountComments = config('site_settings.AdminCountComments', 15);
        $adminSortComments  = config('site_settings.AdminSortComments', 'idDesc');

        // Определяем поле и направление сортировки
        $sortField = 'id';
        $sortDirection = 'desc';

        // TODO: Добавить больше вариантов сортировки (по дате, пользователю, статусу и т.д.)
        if ($adminSortComments === 'idAsc') {
            $sortField = 'id';
            $sortDirection = 'asc';
        }

        // Запрос для получения комментариев
        $commentsQuery = Comment::with([
            'user:id,name,email', // Загружаем только нужные поля пользователя
            'commentable' // Загружаем полиморфную связь (статью, видео и т.д.)
        ])->orderBy($sortField, $sortDirection);

        // TODO: Добавить фильтры по статусу, активности, типу commentable и т.д. из $request
        if ($request->filled('status')) { $commentsQuery->where('approved', $request->boolean('status')); }
        if ($request->filled('activity')) { $commentsQuery->where('activity', $request->boolean('activity')); }
        if ($request->filled('type')) { $commentsQuery->where('commentable_type', $request->input('type')); }

        $comments = $commentsQuery->paginate($adminCountComments);
        $commentsCount = Comment::count(); // Общее количество

        return Inertia::render('Admin/Comments/Index', [
            'comments'      => CommentResource::collection($comments),
            'commentsCount' => $commentsCount,
            'adminCountComments' => (int)$adminCountComments,
            'adminSortComments' => $adminSortComments,
            // TODO: Передать параметры фильтров для отображения в интерфейсе
            'filters' => $request->only(['status', 'activity', 'type'])
        ]);
    }

    /**
     * Отображение формы редактирования комментария.
     */
    public function edit(Comment $comment): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('edit-comments', $comment);
        $comment->load(['user:id,name', 'commentable', 'parent' => fn($q) => $q->with('user:id,name')]);

        return Inertia::render('Admin/Comments/Edit', [
            'comment' => new CommentResource($comment),
        ]);
    }

    /**
     * Обновление комментария.
     */
    public function update(CommentRequest $request, Comment $comment): RedirectResponse // Используем RMB
    {
        // authorize() в CommentRequest
        $data = $request->validated();

        unset($data['user_id'], $data['commentable_id'], $data['commentable_type'], $data['parent_id']);

        try {
            $comment->update($data); // Обновляем только 'content', 'approved', 'activity'
            Log::info('Комментарий обновлен: ID ' . $comment->id);
            return redirect()->route('comments.index')
                ->with('success', __('admin/controllers.updated_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка при обновлении комментария ID {$comment->id}: " . $e->getMessage());
            return back()->withInput()
                ->with('error', __('admin/controllers.updated_error'));
        }
    }

    /**
     * Удаление комментария.
     */
    public function destroy(Comment $comment): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('delete-comments', $comment);
        try {
            // Транзакция не строго обязательна, т.к. дочерние удаляются через onDelete('cascade') в БД
            $comment->delete();
            Log::info('Комментарий удален: ID ' . $comment->id);
            return redirect()->route('comments.index')
                ->with('success', __('admin/controllers.deleted_success'));
        } catch (Throwable $e) {
            Log::error("Ошибка при удалении комментария ID {$comment->id}: " . $e->getMessage());
            return back()
                ->with('error', __('admin/controllers.deleted_error'));
        }
    }

    /**
     * Массовое удаление комментариев.
     */
    public function bulkDestroy(Request $request): JsonResponse // Оставляем Request
    {
        // TODO: Проверка прав $this->authorize('delete-comments', Comment::class);

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:comments,id',
        ]);
        $commentIds = $validated['ids'];
        try {
            // Транзакция не строго обязательна
            Comment::whereIn('id', $commentIds)->delete(); // Используем delete()
            Log::info('Комментарии удалены: ', $commentIds);

            return response()
                ->json(
                    [
                        'success' => true,
                        'message' => __('admin/controllers.bulk_deleted_success'),
                        'reload' => true
                    ]);
        } catch (Throwable $e) {
            Log::error("Ошибка при массовом удалении комментариев: "
                . $e->getMessage(), ['ids' => $commentIds]);
            return response()
                ->json(
                    [
                        'success' => false,
                        'message' => __('admin/controllers.bulk_deleted_error')
                    ], 500);
        }
    }

    /**
     * Обновление активности комментария.
     */
    // Используем {comment} в маршруте для RMB
    public function updateActivity(UpdateActivityRequest $request, Comment $comment): JsonResponse
    {
        $validated = $request->validated();
        $comment->activity = $validated['activity'];
        $comment->save();

        Log::info("Обновлена активность комментария ID {$comment->id} на {$comment->activity}");

        return response()->json([
            'success' => true,
            'activity' => $comment->activity,
            'message' => $comment->activity
                ? __('admin/controllers.activated_success')
                : __('admin/controllers.deactivated_success'),
        ]);
    }

    /**
     * Обновление статуса активности массово
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkUpdateActivity(Request $request): RedirectResponse
    {
        // TODO: Проверка прав $this->authorize('update-comments', $comment);
        $validated = $request->validate([
            'ids'      => 'required|array',
            'ids.*'    => 'required|integer|exists:comments,id',
            'activity' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['comments'] as $commentData) {
                // Используем update для массового обновления, если возможно, или where/update
                Comment::where('id', $commentData['id'])->update(['activity' => $commentData['activity']]);
            }
            DB::commit();

            Log::info('Массово обновлена активность',
                ['count' => count($validated['comments'])]);
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
     * Одобрение комментария.
     */
    // Используем {comment} в маршруте для RMB
    public function approve(Request $request, Comment $comment): JsonResponse
    {
        $comment->approved = !$comment->approved; // переключаем
        $comment->save();

        return response()->json([
            'success' => true,
            'approved' => $comment->approved,
            'message' => $comment->approved ?
                __('admin/controllers.comment_approved')
                : __('admin/controllers.comment_not_approved'),
        ]);
    }

}
