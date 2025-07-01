<?php

namespace App\Http\Controllers\Admin\Invokable;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request; // Не используется
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log; // Импорт Log
use Throwable; // Импорт Throwable

class RemovePermissionFromRoleController extends Controller
{
    /**
     * Отзывает указанное разрешение у указанной роли.
     *
     * @param Role $role Модель роли (через Route Model Binding)
     * @param Permission $permission Модель разрешения (через Route Model Binding)
     * @return RedirectResponse
     */
    public function __invoke(Role $role, Permission $permission): RedirectResponse
    {
        // TODO: Реализовать проверку прав доступа. Пример:
        // $this->authorize('update', $role); // Может ли пользователь редактировать эту роль?
        // $this->authorize('assign permissions'); // Специальное разрешение?
//        if (!auth()->user()?->can('assign permissions')) { // Пример
//            abort(403, 'У вас нет прав для изменения разрешений роли.');
//        }

        // Проверяем, было ли разрешение у роли ДО отзыва
        $hadPermission = $role->hasPermissionTo($permission);

        try {
            // Отзываем разрешение
            $role->revokePermissionTo($permission);

            // Очищаем кэш Spatie, чтобы изменения применились немедленно
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            if ($hadPermission) {
                Log::info('Разрешение для роли успешно отозвано', [
                    'role_id' => $role->id,
                    'role_name' => $role->name,
                    'permission_id' => $permission->id,
                    'permission_name' => $permission->name,
                    'user_id' => auth()->id()
                ]);
                return back()->with('success', "Разрешение '{$permission->name}' успешно отозвано у роли '{$role->name}'.");
            } else {
                // Если разрешения и так не было
                Log::warning('Попытался отозвать разрешение у role, но у role его не было.', [
                    'role_id' => $role->id,
                    'role_name' => $role->name,
                    'permission_id' => $permission->id,
                    'permission_name' => $permission->name,
                    'user_id' => auth()->id()
                ]);
                // Можно вернуть 'info' или то же 'success', т.к. итоговое состояние достигнуто
                return back()->with('info', "Разрешение '{$permission->name}' уже не было назначено роли '{$role->name}'.");
            }

        } catch (Throwable $e) {
            Log::error("Ошибка при отзыве разрешения {$permission->id} у роли {$role->id}: " . $e->getMessage(), [
                'user_id' => auth()->id()
            ]);
            return back()->with('error', 'Произошла ошибка при отзыве разрешения у роли.');
        }
    }
}
