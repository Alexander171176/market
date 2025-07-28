<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Models\Admin\Comment\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Получить все активные и одобренные комментарии для конкретного ресурса (например, статьи или видео).
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'commentable_type' => 'required|string',
            'commentable_id'   => 'required|integer',
        ]);

        $comments = Comment::with(['user', 'replies.user'])
            ->where('commentable_type', $request->commentable_type)
            ->where('commentable_id', $request->commentable_id)
            ->where('approved', true) // ✅ Заменено
            ->where('activity', true)
            ->whereNull('parent_id')
            ->get();

        return response()->json($comments);
    }

    /**
     * Сохранить новый комментарий (или ответ).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'commentable_type' => 'required|string',
            'commentable_id'   => 'required|integer',
            'content'          => 'required|string|max:500',
            'parent_id'        => 'nullable|exists:comments,id',
        ]);

        try {
            $comment = new Comment([
                'user_id'          => auth()->id(), // ← используем текущего пользователя
                'commentable_type' => $validated['commentable_type'],
                'commentable_id'   => $validated['commentable_id'],
                'content'          => $validated['content'],
                'parent_id'        => $validated['parent_id'] ?? null,
                'status'           => false,
                'activity'         => true,
            ]);

            $comment->save();
            $comment->load('user');

            return response()->json($comment, 201);
        } catch (\Exception $e) {
            Log::error("Ошибка при создании комментария: {$e->getMessage()}", $validated);

            return response()->json([
                'message' => __('admin/controllers.commented_saved_error'),
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Показать конкретный комментарий, если он активен и одобрен.
     */
    public function show(Comment $comment): JsonResponse
    {
        if ($comment->status && $comment->activity) {
            $comment->load(['user', 'replies.user']);
            return response()->json($comment);
        }

        return response()
            ->json(['message' => __('admin/controllers.comment_not_active_error')], 404);
    }

    /**
     * Обновить содержимое комментария.
     */
    public function update(Request $request, Comment $comment): JsonResponse
    {
        if ($comment->user_id !== auth()->id()) {
            return response()
                ->json(['message' => __('admin/controllers.comment_not_editing_error')], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:500',
        ]);

        try {
            $comment->update(['content' => $validated['content']]);
            return response()->json($comment, 200);
        } catch (\Exception $e) {
            Log::error("Ошибка при обновлении комментария: {$e->getMessage()}", ['id' => $comment->id]);
            return response()->json([
                'message' => __('admin/controllers.commented_updated_error'),
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Удалить комментарий.
     */
    public function destroy(Comment $comment): JsonResponse
    {
        if ($comment->user_id !== auth()->id()) {
            return response()
                ->json(['message' => __('admin/controllers.comment_not_deleted_error')], 403);
        }

        try {
            $comment->delete();
            return response()
                ->json(['message' => __('admin/controllers.comment_deleted_success')], 200);
        } catch (\Exception $e) {
            Log::error("Ошибка при удалении комментария: {$e->getMessage()}", ['id' => $comment->id ?? null]);
            return response()->json([
                'message' => __('admin/controllers.comment_deleted_error'),
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
