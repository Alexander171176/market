<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request; // Не используется
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemoveRoleFromUserController extends Controller
{
    /**
     * Удаляет указанную роль у указанного пользователя.
     *
     * @param User $user Модель пользователя (через Route Model Binding)
     * @param Role $role Модель роли (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(User $user, Role $role): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Примеры:
        // $this->authorize('update', $user); // Может ли редактировать пользователя?
        // $this->authorize('assign roles'); // Специальное разрешение?
//        if (!auth()->user()?->can('assign roles')) { // Пример
//            abort(403, 'У вас нет прав для изменения ролей пользователя.');
//        }
        // TODO: Добавить проверку, чтобы нельзя было удалять роли у самого себя или у супер-админа?
        // if ($user->id === auth()->id()) { abort(403, 'Нельзя изменять свои роли.'); }
        // if ($user->hasRole('super-admin') && $role->name === 'super-admin') { abort(403, 'Нельзя удалить роль super-admin у супер-администратора.'); }
        // Или запретить удалять определенные роли у любых пользователей:
        // if (in_array($role->name, ['super-admin'])) { abort(403, 'Эту роль нельзя удалить у пользователя.'); }


        // Проверяем, была ли роль у пользователя ДО удаления
        $hadRole = $user->hasRole($role);

        try {
            // Удаляем роль
            $user->removeRole($role);

            // Очищаем кэш Spatie
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            if ($hadRole) {
                Log::info('Роль успешно удалена у пользователя', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'role_id' => $role->id,
                    'role_name' => $role->name,
                    'removed_by_user_id' => auth()->id()
                ]);
                return back()->with('success', "Роль '{$role->name}' успешно удалена у пользователя '{$user->name}'.");
            } else {
                Log::warning('Попытался удалить роль у пользователя, но у пользователя ее не было.', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'role_id' => $role->id,
                    'role_name' => $role->name,
                    'removed_by_user_id' => auth()->id()
                ]);
                return back()->with('info', "У пользователя '{$user->name}' не было роли '{$role->name}'.");
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при удалении роли {$role->id} у пользователя {$user->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при удалении роли у пользователя.');
        }
    }
}
