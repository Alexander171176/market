<?php

namespace App\Http\Controllers\Api\User;

use App\Actions\Fortify\PasswordValidationRules;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Permission\PermissionResource;
use App\Http\Resources\Admin\Role\RoleResource;
use App\Http\Resources\Admin\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     @OA\Contact(
 *         email="kosolapov1976@gmail.com"
 *     )
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 */

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="User model",
 *     required={"id", "name", "email", "created_at", "updated_at"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="email", type="string", example="john@example.com"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-01-01T00:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-01-01T00:00:00Z")
 * )
 */
class ApiUserController extends Controller
{
    use PasswordValidationRules;

    /**
     * @OA\Get(
     *     path="/api/users",
     *     operationId="getUsers",
     *     tags={"Users"},
     *     summary="Display a listing of the users",
     *     description="Get a list of users with their roles and permissions",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     )
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $users = User::with(['roles', 'permissions'])->get();
        $usersCount = DB::table('users')->count();
        $roles = Role::all();
        $permissions = Permission::all();

        return response()->json([
            'users'       => UserResource::collection($users),
            'usersCount'  => $usersCount,
            'roles'       => RoleResource::collection($roles),
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     operationId="storeUser",
     *     tags={"Users"},
     *     summary="Store a newly created user",
     *     description="Create a new user with roles and permissions",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)],
            'password'    => ['required', 'confirmed', Rules\Password::defaults()],
            'roles'       => ['sometimes', 'array'],
            'permissions' => ['sometimes', 'array']
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (isset($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        $user->load(['roles', 'permissions']);

        return response()->json(new UserResource($user), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     operationId="updateUser",
     *     tags={"Users"},
     *     summary="Update the specified user",
     *     description="Update a specific user by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    public function update(Request $request, User $user): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'roles'       => ['sometimes', 'array'],
            'permissions' => ['sometimes', 'array']
        ]);

        $user->update([
            'name'  => $data['name'],
            'email' => $data['email'],
        ]);

        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        if (isset($data['permissions'])) {
            $user->syncPermissions($data['permissions']);
        }

        $user->load(['roles', 'permissions']);

        return response()->json(new UserResource($user));
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     operationId="deleteUser",
     *     tags={"Users"},
     *     summary="Remove the specified user",
     *     description="Delete a specific user by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successful operation"
     *     )
     * )
     */
    public function destroy(User $user): \Illuminate\Http\JsonResponse
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
