<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\Admin\Banner\Banner;
use App\Models\Admin\Section\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveBannerFromSectionController extends Controller
{
    /**
     * Отсоединяет указанный баннер от указанной секции.
     *
     * @param Banner $banner Модель баннера (через Route Model Binding)
     * @param Section $section Модель секции (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Banner $banner, Section $section): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $banner);
        // $this->authorize('update', $section);
        // $this->authorize('manage banner relationships');
//        if (!auth()->user()?->can('manage content')) { // Пример
//            abort(403, 'У вас нет прав для изменения связей баннеров.');
//        }

        try {
            // Выполняем отсоединение. Выбираем один из вариантов:
            // Вариант 1: Отсоединяем секцию от баннера
            $detached = $banner->sections()->detach($section->id);
            // Вариант 2: Отсоединяем баннер от секции
            // $detached = $section->banners()->detach($banner->id);

            if ($detached) {
                Log::info('Баннер успешно удален из раздела', [
                    'banner_id' => $banner->id,
                    'section_id' => $section->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Баннер '{$banner->title}' успешно отсоединен от секции '{$section->title}'.");
            } else {
                Log::warning('Попытался отсоединить баннер от раздела, но связи не было.', [
                    'banner_id' => $banner->id,
                    'section_id' => $section->id,
                    'user_id' => auth()->id()
                ]);
                return back()->with('info', 'Баннер уже был отсоединен от этой секции.');
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отсоединении баннера {$banner->id} от раздела {$section->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отсоединении баннера от секции.');
        }
    }
}
