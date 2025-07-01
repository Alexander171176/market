<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Rubric\Rubric;
use App\Models\Admin\Section\Section;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request; // Не используется
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveRubricFromSectionController extends Controller
{
    /**
     * Отсоединяет указанную рубрику от указанной секции.
     *
     * @param Section $section Модель секции (через Route Model Binding)
     * @param Rubric $rubric Модель рубрики (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Section $section, Rubric $rubric): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $section); // Может ли редактировать секцию?
        // $this->authorize('update', $rubric);  // Может ли редактировать рубрику?
        // $this->authorize('manage section relationships'); // Специальное разрешение?
//        if (!auth()->user()?->can('manage content')) { // Пример
//            abort(403, 'У вас нет прав для изменения связей рубрик и секций.');
//        }

        try {
            // Выполняем отсоединение.
            // Вариант 1: Отсоединяем рубрику от секции
            $detached = $section->rubrics()->detach($rubric->id);
            // Вариант 2: Отсоединяем секцию от рубрики
            // $detached = $rubric->sections()->detach($section->id);

            if ($detached) {
                Log::info('Рубрика успешно отделена от раздела', [
                    'section_id' => $section->id,
                    'section_title' => $section->title,
                    'rubric_id' => $rubric->id,
                    'rubric_title' => $rubric->title,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Рубрика '{$rubric->title}' успешно отсоединена от секции '{$section->title}'.");
            } else {
                Log::warning('Попытался отделить рубрику от раздела, но связи не было.', [
                    'section_id' => $section->id,
                    'section_title' => $section->title,
                    'rubric_id' => $rubric->id,
                    'rubric_title' => $rubric->title,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', "Рубрика '{$rubric->title}' уже была отсоединена от секции '{$section->title}'.");
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении рубрики {$rubric->id} от раздела {$section->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении рубрики от секции.');
        }
    }
}
