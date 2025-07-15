<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Section\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveArticleFromSectionController extends Controller
{
    /**
     * Отсоединяет указанную статью от указанной секции.
     *
     * @param Article $article Модель статьи (через Route Model Binding)
     * @param Section $section Модель секции (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Article $article, Section $section): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $article); // Может ли пользователь редактировать статью?
        // $this->authorize('update', $section); // Может ли пользователь редактировать секцию?
        // $this->authorize('manage article relationships'); // Специальное разрешение?
//        if (!auth()->user()?->can('manage content')) { // Пример простого разрешения
//            abort(403, 'У вас нет прав для изменения связей.');
//        }


        try {
            // Выполняем отсоединение. Выбираем один из вариантов:
            // Вариант 1: Отсоединяем секцию от статьи
            $detached = $article->sections()->detach($section->id);
            // Вариант 2: Отсоединяем статью от секции
            // $detached = $section->articles()->detach($article->id);

            if ($detached) {
                Log::info('Статья успешно удалена из раздела', [
                    'article_id' => $article->id,
                    'section_id' => $section->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Статья '{$article->title}' успешно отсоединена от секции '{$section->title}'.");
            } else {
                // detach() возвращает 0, если связь уже не существовала
                Log::warning('Попытался отделить статью от раздела, но связи не было.', [
                    'article_id' => $article->id,
                    'section_id' => $section->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', 'Статья уже была отсоединена от этой секции.');
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении статьи {$article->id} от раздела {$section->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении статьи от секции.');
        }
    }
}
