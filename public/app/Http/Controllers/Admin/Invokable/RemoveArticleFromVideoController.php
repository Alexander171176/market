<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Video\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveArticleFromVideoController extends Controller
{
    /**
     * Отсоединяет указанную статью от указанного видео.
     *
     * @param Video $video Модель видео (через Route Model Binding)
     * @param Article $article Модель статьи (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Video $video, Article $article): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $video); // Может ли редактировать видео?
        // $this->authorize('update', $article); // Может ли редактировать статью?
        // $this->authorize('manage content relationships'); // Специальное разрешение?
//        if (!auth()->user()?->can('manage content')) { // Пример
//            abort(403, 'У вас нет прав для изменения связей видео и статей.');
//        }

        try {
            // Выполняем отсоединение. Выбираем один из вариантов:
            // Вариант 1: Отсоединяем статью от видео
            $detached = $video->articles()->detach($article->id);
            // Вариант 2: Отсоединяем видео от статьи
            // $detached = $article->videos()->detach($video->id);

            if ($detached) {
                Log::info('Статья успешно отсоединена от видео', [
                    'video_id' => $video->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                // Уточненное сообщение
                return back()->with('success', "Статья '{$article->title}' успешно отсоединена от видео '{$video->title}'.");
            } else {
                Log::warning('Попытался отделить статью от видео, но взаимосвязи не было.', [
                    'video_id' => $video->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', 'Статья уже была отсоединена от этого видео.');
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении статьи {$article->id} от видео {$video->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении статьи от видео.');
        }
    }
}
