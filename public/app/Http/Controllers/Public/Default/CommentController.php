<?php

namespace App\Http\Controllers\Public\Default;

use App\Http\Controllers\Controller;
use App\Models\Admin\Comment\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($article): \Illuminate\Http\JsonResponse
    {
        // Загружаем комментарии вместе с данными пользователя и ответами
        $comments = Comment::with(['user', 'replies.user'])  // Подгружаем реплики и пользователей
        ->where('article_id', $article)
            ->where('status', true)
            ->where('activity', true)
            ->whereNull('parent_id')  // Только корневые комментарии
            ->get();

        return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        // Валидация данных
        $validated = $request->validate([
            'article_id' => 'required|exists:articles,id',
            'user_id' => 'required|exists:users,id',  // Проверяем наличие user_id
            'content' => 'required|string|max:500',
            'parent_id' => 'nullable|exists:comments,id'  // Проверяем наличие parent_id, если это ответ
        ]);

        try {
            // Создаем новый комментарий или ответ
            $comment = new Comment([
                'user_id' => $validated['user_id'],
                'article_id' => $validated['article_id'],
                'content' => $validated['content'],
                'parent_id' => $validated['parent_id'] ?? null,  // Добавляем parent_id для ответов
                'status' => false,  // Комментарии требуют модерации
                'activity' => true,  // Комментарии активны
            ]);
            $comment->save();

            // Загружаем пользователя вместе с комментариями
            $comment->load('user');

            return response()->json($comment, 201);  // Возвращаем созданный комментарий
        } catch (\Exception $e) {
            Log::error("Ошибка при создании комментария: {$e->getMessage()}", [
                'user_id' => $validated['user_id'],
                'article_id' => $validated['article_id']
            ]);

            return response()->json(['message' => 'Ошибка при сохранении комментария', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Comment $comment): \Illuminate\Http\JsonResponse
    {
        // Загружаем пользователя и реплики, если комментарий активен
        if ($comment->status && $comment->activity) {
            $comment->load(['user', 'replies.user']);  // Загружаем автора комментария и реплики
            return response()->json($comment);
        }

        return response()->json(['message' => 'Комментарий не найден или неактивен'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment): \Illuminate\Http\JsonResponse
    {
        // Валидация данных
        $validated = $request->validate([
            'content' => 'required|string|max:500'
        ]);

        try {
            // Обновление комментария
            $comment->update([
                'content' => $validated['content']
            ]);

            return response()->json($comment, 200);  // Возвращаем обновленный комментарий
        } catch (\Exception $e) {
            Log::error("Ошибка при обновлении комментария: {$e->getMessage()}", [
                'comment_id' => $comment->id
            ]);

            return response()->json(['message' => 'Ошибка при обновлении комментария', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): \Illuminate\Http\JsonResponse
    {
        try {
            // Удаление комментария и его ответов
            $comment->delete();

            return response()->json(['message' => 'Комментарий удалён'], 200);
        } catch (\Exception $e) {
            Log::error("Ошибка при удалении комментария: {$e->getMessage()}", [
                'comment_id' => $comment->id ?? 'unknown'
            ]);

            return response()->json(['message' => 'Ошибка при удалении комментария', 'error' => $e->getMessage()], 500);
        }
    }
}
