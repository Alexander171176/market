<?php

namespace App\Http\Controllers\Admin\User;

use App\Actions\Fortify\PasswordValidationRules;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Http\Resources\Admin\Permission\PermissionResource;
use App\Http\Resources\Admin\Role\RoleResource;
use App\Http\Resources\Admin\User\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Throwable;

class UserController extends Controller
{
    use PasswordValidationRules;

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // TODO: Проверка прав $this->authorize('show-users', User::class);

        // Прямой запрос без кэширования
        $users = User::with(['roles', 'permissions'])->get();
        $usersCount = User::count();

        // Получаем значение параметра из конфигурации (оно загружается через AppServiceProvider)
        $adminCountUsers = config('site_settings.AdminCountUsers', 10);
        $adminSortUsers  = config('site_settings.AdminSortUsers', 'idDesc');

        return Inertia::render('Admin/Users/Index', [
            'users' => UserResource::collection($users),
            'usersCount' => $usersCount,
            'adminCountUsers' => (int)$adminCountUsers,
            'adminSortUsers' => $adminSortUsers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // TODO: Проверка прав доступа $this->authorize('create-users', User::class);

        // Прямой запрос без кэширования
        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render('Admin/Users/Create', [
            'roles' => RoleResource::collection($roles),
            'permissions' => PermissionResource::collection($permissions)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();

            // Создаём пользователя
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt('password'), // или сгенерируй/введи позже
            ]);

            // Синхронизация ролей
            $roleNames = collect($data['roles'] ?? [])->pluck('name')->toArray();
            $user->syncRoles($roleNames);

            // Синхронизация разрешений
            $permissionNames = collect($data['permissions'] ?? [])->pluck('name')->toArray();
            $user->syncPermissions($permissionNames);

            DB::commit();
            return redirect()->route('admin.users.index')->with('success', __('admin/controllers/users.created'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при создании пользователя: " . $e->getMessage());
            return back()->withInput()->withErrors(['general' => __('admin/controllers/users.create_error'),]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        // TODO: Проверка прав доступа $this->authorize('update-users', $user);

        $user->load(['roles', 'permissions']);
        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render('Admin/Users/Edit', [
            'user' => new UserResource($user),
            'roles' => RoleResource::collection($roles),
            'permissions' => PermissionResource::collection($permissions)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();

            // Приводим к строкам имена
            $roleNames = collect($data['roles'] ?? [])->pluck('name')->toArray();
            $permissionNames = collect($data['permissions'] ?? [])->pluck('name')->toArray();

            $user->syncRoles($roleNames);
            $user->syncPermissions($permissionNames);

            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
            ]);

            DB::commit();
            return redirect()->route('admin.users.index')->with('success', __('admin/controllers/users.updated'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при обновлении пользователя ID {$user->id}: " . $e->getMessage());
            Log::error("Тип ошибки: " . get_class($e));
            return back()->withInput()->withErrors(['general' => __('admin/controllers/users.update_error'),]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        // TODO: Проверка прав доступа $this->authorize('delete-users', $user);

        if ($user->hasRole('super-admin')) {
            return redirect()->route('admin.users.index')
                ->with('error', __('admin/controllers/users.cannot_delete_superadmin'));
        }

        if ($user->id === 1) {
            return redirect()->route('admin.users.index')
                ->with('error', __('admin/controllers/users.cannot_delete_main_admin'));
        }

        $userRoleNames = $user->roles->pluck('name');
        if ($userRoleNames->count() === 1 && $userRoleNames->first() === 'admin') {
            return redirect()->route('admin.users.index')
                ->with('error', __('admin/controllers/users.cannot_delete_single_admin'));
        }

        try {
            DB::beginTransaction();

            // Удаляем роли и разрешения явно
            $user->syncRoles([]);
            $user->syncPermissions([]);
            $user->delete();

            DB::commit();

            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            Log::info("Пользователь удалён: ID {$user->id}");
            return redirect()->route('admin.users.index')->with('success', __('admin/controllers/users.deleted'));

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error("Ошибка при удалении пользователя ID {$user->id}: " . $e->getMessage());
            return back()->withErrors(['general' => __('admin/controllers/users.delete_error'),]);
        }
    }

}
