<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Section\Section;
use App\Models\Admin\Video\Video;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request; // Не используется
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveSectionFromVideoController extends Controller
{
    /**
     * Отсоединяет указанную секцию от указанного видео.
     *
     * @param Video $video Модель видео (через Route Model Binding)
     * @param Section $section Модель секции (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Video $video, Section $section): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $video);
        // $this->authorize('update', $section);
        // $this->authorize('manage video relationships');
//        if (!auth()->user()?->can('manage content')) { // Пример
//            abort(403, 'У вас нет прав для изменения связей видео и секций.');
//        }

        try {
            // Выполняем отсоединение.
            // Вариант 1: Отсоединяем секцию от видео
            $detached = $video->sections()->detach($section->id);
            // Вариант 2: Отсоединяем видео от секции
            // $detached = $section->videos()->detach($video->id);

            if ($detached) {
                Log::info('Раздел успешно удален из видео', [
                    'video_id' => $video->id,
                    'video_title' => $video->title,
                    'section_id' => $section->id,
                    'section_title' => $section->title,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Секция '{$section->title}' успешно отсоединена от видео '{$video->title}'.");
            } else {
                Log::warning('Попытался отделить раздел от видео, но связи не было.', [
                    'video_id' => $video->id,
                    'video_title' => $video->title,
                    'section_id' => $section->id,
                    'section_title' => $section->title,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', "Секция '{$section->title}' уже была отсоединена от видео '{$video->title}'.");
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении раздела {$section->id} от видео {$video->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении секции от видео.');
        }
    }
}
