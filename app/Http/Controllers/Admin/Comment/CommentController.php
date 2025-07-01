<?php

namespace App\Http\Controllers\Admin\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Comment\CommentRequest; // Используем обновленный реквест

// Реквесты для простых действий
use App\Http\Requests\Admin\UpdateActivityRequest;
use App\Http\Requests\Admin\ApproveRequest; // Можно создать для approve

use App\Http\Resources\Admin\Comment\CommentResource;
use App\Models\Admin\Comment\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request; // Для bulkDestroy
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
        // Используем имя из конфига, если оно правильное, иначе 'idDesc'
        $adminSortComments  = config('site_settings.AdminSortComments', 'idDesc'); // Было AdminSortArticles

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
            'adminCountComments' => $adminCountComments,
            'adminSortComments' => $adminSortComments,
            // TODO: Передать параметры фильтров для отображения в интерфейсе
            'filters' => $request->only(['status', 'activity', 'type'])
        ]);
    }

    /**
     * Форма создания комментария обычно не нужна в админке.
     * Если нужна, нужно передать список пользователей и комментируемых сущностей.
     */
    // public function create(): Response
    // {
    //     // $users = User::select('id', 'name')->get();
    //     // $articles = Article::select('id', 'title')->get();
    //     // $videos = Video::select('id', 'title')->get();
    //     // return Inertia::render('Admin/Comments/Create', [...]);
    // }

    /**
     * Сохранение нового комментария (если нужно создавать из админки).
     */
    // public function store(CommentRequest $request): RedirectResponse
    // {
    //     $data = $request->validated();
    //     try {
    //         Comment::create($data);
    //         return redirect()->route('comments.index')->with('success', 'Комментарий успешно создан.');
    //     } catch (Throwable $e) {
    //         Log::error("Ошибка при создании комментария: " . $e->getMessage());
    //         return back()->withInput()->withErrors(['general' => 'Произошла ошибка при создании комментария.']);
    //     }
    // }

    /**
     * Отображение формы редактирования комментария.
     */
    public function edit(Comment $comment): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('edit-comments', $comment);
        // Загружаем связанные модели
        $comment->load(['user:id,name', 'commentable', 'parent' => fn($q) => $q->with('user:id,name')]);

        // TODO: Передать список пользователей, если нужно менять автора
        // $users = User::select('id', 'name')->orderBy('name')->get();
        // TODO: Передать список родительских комментариев (для той же сущности), если нужно менять родителя
        // $parentOptions = Comment::where('id', '!=', $comment->id)
        //                         ->where('commentable_id', $comment->commentable_id)
        //                         ->where('commentable_type', $comment->commentable_type)
        //                         ->select('id', 'content') // Или что-то для отображения
        //                         ->orderBy('created_at')
        //                         ->get();

        return Inertia::render('Admin/Comments/Edit', [
            'comment' => new CommentResource($comment),
            // 'users' => UserResource::collection($users), // Если передаем список пользователей
            // 'parentOptions' => $parentOptions,          // Если передаем список родителей
        ]);
    }

    /**
     * Обновление комментария.
     */
    public function update(CommentRequest $request, Comment $comment): RedirectResponse // Используем RMB
    {
        // authorize() в CommentRequest
        $data = $request->validated();

        // Удаляем поля, которые обычно не должны меняться при редактировании комментария
        unset($data['user_id'], $data['commentable_id'], $data['commentable_type'], $data['parent_id']);
        // Если разрешено менять родителя, уберите 'parent_id' из unset

        try {
            $comment->update($data); // Обновляем только 'content', 'approved', 'activity'
            Log::info('Комментарий обновлен: ID ' . $comment->id);
            return redirect()->route('comments.index')->with('success', 'Комментарий успешно обновлен.');
        } catch (Throwable $e) {
            Log::error("Ошибка при обновлении комментария ID {$comment->id}: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => 'Произошла ошибка при обновлении комментария.']);
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
            return redirect()->route('comments.index')->with('success', 'Комментарий успешно удален.');
        } catch (Throwable $e) {
            Log::error("Ошибка при удалении комментария ID {$comment->id}: " . $e->getMessage());
            return back()->withErrors(['general' => 'Произошла ошибка при удалении комментария.']);
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
            return response()->json(['success' => true, 'message' => 'Выбранные комментарии удалены.', 'reload' => true]);
        } catch (Throwable $e) {
            Log::error("Ошибка при массовом удалении комментариев: " . $e->getMessage(), ['ids' => $commentIds]);
            return response()->json(['success' => false, 'message' => 'Ошибка при удалении комментариев.'], 500);
        }
    }

    /**
     * Обновление активности комментария.
     */
    // Используем {comment} в маршруте для RMB
    public function updateActivity(UpdateActivityRequest $request, Comment $comment): JsonResponse
    {
        // authorize() в UpdateActivityRequest
        $validated = $request->validated(); // Валидирует только 'activity'
        $comment->activity = $validated['activity'];
        $comment->save();
        Log::info("Обновлено activity комментария ID {$comment->id} на {$comment->activity}");
        return response()->json(['success' => true, 'reload' => true]);
    }

    /**
     * Одобрение комментария.
     */
    // Используем {comment} в маршруте для RMB
    public function approve(Request $request, Comment $comment): JsonResponse // Добавляем Request для возможной валидации/авторизации
    {
        // TODO: Проверка прав $this->authorize('approve-comments', $comment);

        // Можно добавить FormRequest ApproveCommentRequest
        $request->validate(['approved' => 'sometimes|boolean']); // Валидация, если approved передается (хотя тут мы его просто ставим в true)

        try {
            $comment->approved = true; // Используем новое поле
            $comment->save();
            Log::info("Комментарий одобрен: ID " . $comment->id);
            return response()->json(['success' => true, 'message' => 'Комментарий успешно одобрен', 'reload' => true]); // Добавили success и reload
        } catch (Throwable $e) {
            Log::error("Ошибка при одобрении комментария ID {$comment->id}: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Ошибка одобрения комментария.'], 500);
        }
    }

    // Метод updateSort не нужен для комментариев
    // Метод clone не нужен для комментариев
}
