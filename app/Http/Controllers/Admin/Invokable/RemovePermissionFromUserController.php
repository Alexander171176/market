<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request; // Не используется
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemovePermissionFromUserController extends Controller
{
    /**
     * Отзывает указанное прямое разрешение у указанного пользователя.
     *
     * @param User $user Модель пользователя (через Route Model Binding)
     * @param Permission $permission Модель разрешения (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(User $user, Permission $permission): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $user); // Может ли текущий пользователь редактировать целевого пользователя?
        // $this->authorize('assign permissions'); // Специальное разрешение?
//        if (!auth()->user()?->can('assign permissions')) { // Пример
//            abort(403, 'У вас нет прав для изменения разрешений пользователя.');
//        }
        // TODO: Возможно, добавить проверку, чтобы нельзя было отзывать разрешения у самого себя или у супер-админа?
        // if ($user->id === auth()->id()) { abort(403, 'Нельзя изменять свои прямые разрешения.'); }
        // if ($user->hasRole('super-admin')) { abort(403, 'Нельзя изменять прямые разрешения супер-администратора.'); }


        // Проверяем, было ли разрешение у пользователя ДО отзыва (прямое разрешение)
        $hadDirectPermission = $user->hasDirectPermission($permission);

        try {
            // Отзываем прямое разрешение
            $user->revokePermissionTo($permission);

            // Очищаем кэш Spatie
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            if ($hadDirectPermission) {
                Log::info('Direct Permission revoked from User successfully', [
                    'user_id' => $user->id,
                    'user_email' => $user->email, // Добавим email для лога
                    'permission_id' => $permission->id,
                    'permission_name' => $permission->name,
                    'revoked_by_user_id' => auth()->id() // Кто отозвал
                ]);
                return back()->with('success', "Прямое разрешение '{$permission->name}' успешно отозвано у пользователя '{$user->name}'.");
            } else {
                Log::warning('Attempted to revoke direct permission from user, but user did not have it directly.', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'permission_id' => $permission->id,
                    'permission_name' => $permission->name,
                    'revoked_by_user_id' => auth()->id()
                ]);
                return back()->with('info', "У пользователя '{$user->name}' не было прямого разрешения '{$permission->name}'.");
            }

        } catch (Throwable $e) {
            Log::error("Error revoking direct permission {$permission->id} from user {$user->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отзыве разрешения у пользователя.');
        }
    }
}
