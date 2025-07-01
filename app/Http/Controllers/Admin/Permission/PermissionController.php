<?php

namespace App\Http\Controllers\Admin\Permission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Permission\PermissionRequest; // Используем
use App\Http\Resources\Admin\Permission\PermissionResource;
// Модели не нужны напрямую, используем RMB
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB; // Для транзакций (опционально)
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission; // Импортируем модель
use Spatie\Permission\PermissionRegistrar;
use Throwable;

/**
 * Контроллер для управления Разрешениями в административной панели.
 *
 * Предоставляет CRUD операции.
 *
 * @version 1.1 (Улучшен с RMB, транзакциями, Form Requests)
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 * @see \Spatie\Permission\Models\Permission Модель Разрешения
 * @see \App\Http\Requests\Admin\Permission\PermissionRequest Запрос для создания/обновления
 */
class PermissionController extends Controller
{
    /**
     * Отображение списка всех Разрешений.
     * Загружает пагинированный список с сортировкой по настройкам.
     * Передает данные для отображения и настройки пагинации/сортировки.
     * Пагинация и сортировка выполняются на фронтенде.
     *
     * @return Response
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-permissions', Permission::class);

        $adminCountPermissions = config('site_settings.AdminCountPermissions', 25); // Больше на страницу
        $adminSortPermissions  = config('site_settings.AdminSortPermissions', 'nameAsc'); // Сортировка по имени

        try {
            // Загружаем ВСЕ разрешения
            $permissions = Permission::all();
            $permissionsCount = $permissions->count(); // Считаем из загруженной коллекции

        } catch (Throwable $e) {
            Log::error("Ошибка загрузки разрешений для Index: " . $e->getMessage());
            $permissions = collect(); // Пустая коллекция в случае ошибки
            $permissionsCount = 0;
            session()->flash('error', __('admin/controllers/permissions.index_error'));
        }

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => PermissionResource::collection($permissions),
            'permissionsCount' => $permissionsCount,
            'adminCountPermissions' => (int)$adminCountPermissions,
            'adminSortPermissions' => $adminSortPermissions,
        ]);
    }

    /**
     * Отображение формы создания нового разрешения.
     *
     * @return Response
     */
    public function create(): Response
    {
        // TODO: Проверка прав $this->authorize('create-permissions', Permission::class);

        return Inertia::render('Admin/Permissions/Create');
    }

    /**
     * Сохранение нового разрешения в базе данных.
     * Использует PermissionRequest для валидации и авторизации.
     *
     * @param PermissionRequest $request
     * @return RedirectResponse Редирект на список статей с сообщением.
     */
    public function store(PermissionRequest $request): RedirectResponse
    {
        // authorize() в PermissionRequest
        $data = $request->validated();

        try {
            DB::beginTransaction();
            Permission::create([
                'name' => $data['name'],
                'guard_name' => 'sanctum',
            ]);
            DB::commit();

            Log::info('Разрешение создано:', ['name' => $data['name']]);
            app()[PermissionRegistrar::class]->forgetCachedPermissions(); // Очистка кэша Spatie
            return redirect()->route('admin.permissions.index')
                ->with('success', __('admin/controllers/permissions.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании разрешения: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/permissions.create_error')	]);
        }
    }

    /**
     * Отображение формы редактирования существующего разрешения.
     * Использует Route Model Binding для получения модели.
     *
     * @param Permission $permission Модель разрешения, найденная по ID из маршрута.
     * @return Response
     */
    public function edit(Permission $permission): Response // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('edit-permissions', $permission);

        return Inertia::render('Admin/Permissions/Edit', [
            'permission' => new PermissionResource($permission),
        ]);
    }

    /**
     * Обновление существующего разрешения в базе данных.
     * Использует PermissionRequest и Route Model Binding.
     *
     * @param PermissionRequest $request Валидированный запрос.
     * @param Permission $permission Модель разрешения для обновления.
     * @return RedirectResponse Редирект на список разрешений с сообщением.
     */
    public function update(PermissionRequest $request, Permission $permission): RedirectResponse // Используем RMB
    {
        // authorize() в PermissionRequest
        $data = $request->validated();

        try {
            DB::beginTransaction();
            // Обновляем только имя, guard обычно не меняют
            $permission->update(['name' => $data['name']]);
            DB::commit();

            Log::info('Разрешение обновлено:', ['id' => $permission->id, 'name' => $permission->name]);
            app()[PermissionRegistrar::class]->forgetCachedPermissions(); // Очистка кэша Spatie
            return redirect()->route('admin.permissions.index')->with('success', __('admin/controllers/permissions.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении разрешения ID {$permission->id}: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/permissions.update_error')]);
        }
    }

    /**
     * Удаление указанного разрешения.
     * Использует Route Model Binding.
     *
     * @param Permission $permission Модель разрешения для удаления.
     * @return RedirectResponse Редирект на список разрешений с сообщением.
     */
    public function destroy(Permission $permission): RedirectResponse // Используем RMB
    {
        // TODO: Проверка прав $this->authorize('delete-permissions', $permission);
        // TODO: Добавить проверку, не является ли разрешение базовым/системным?

        try {
            DB::beginTransaction();
            $permission->delete(); // Spatie удалит связи из role_has_permissions и model_has_permissions
            DB::commit();

            Log::info('Разрешение удалено:', ['id' => $permission->id, 'name' => $permission->name]);
            app()[PermissionRegistrar::class]->forgetCachedPermissions(); // Очистка кэша Spatie
            return redirect()->route('admin.permissions.index')->with('success', __('admin/controllers/permissions.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении разрешения ID {$permission->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/permissions.delete_error')]);
        }
    }

}
