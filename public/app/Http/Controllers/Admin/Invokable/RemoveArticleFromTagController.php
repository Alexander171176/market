<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Tag\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveArticleFromTagController extends Controller
{
    /**
     * Отсоединяет указанный тег от указанной статьи.
     *
     * @param Tag $tag Модель тега (через Route Model Binding)
     * @param Article $article Модель статьи (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Tag $tag, Article $article): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $article); // Может ли редактировать статью?
        // $this->authorize('update', $tag);     // Может ли редактировать тег?
        // $this->authorize('manage tag relationships'); // Специальное разрешение?
//        if (!auth()->user()?->can('manage content')) { // Пример
//            abort(403, 'У вас нет прав для изменения связей тегов.');
//        }

        try {
            // Выполняем отсоединение. Выбираем один из вариантов:
            // Вариант 1: Отсоединяем статью от тега
            $detached = $tag->articles()->detach($article->id);
            // Вариант 2: Отсоединяем тег от статьи
            // $detached = $article->tags()->detach($tag->id);

            if ($detached) {
                Log::info('Тег успешно отсоединен от статьи', [
                    'tag_id' => $tag->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Тег '{$tag->name}' успешно отсоединен от статьи '{$article->title}'.");
            } else {
                Log::warning('Попытался отсоединить тег от статьи, но связь не существовала.', [
                    'tag_id' => $tag->id,
                    'article_id' => $article->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', 'Тег уже был отсоединен от этой статьи.');
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении тега {$tag->id} от статьи {$article->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении тега от статьи.');
        }
    }
}
