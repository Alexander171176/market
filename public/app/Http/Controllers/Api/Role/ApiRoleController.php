<?php

namespace App\Http\Controllers\Api\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\RoleRequest;
use App\Http\Resources\Admin\Permission\PermissionResource;
use App\Http\Resources\Admin\Role\RoleResource;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0",
 *     @OA\Contact(
 *         email="support@example.com"
 *     )
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 */

/**
 * @OA\Schema(
 *     schema="Permission",
 *     type="object",
 *     title="Permission",
 *     description="Permission model",
 *     properties={
 *         @OA\Property(property="id", type="integer", description="Permission ID"),
 *         @OA\Property(property="name", type="string", description="Permission name"),
 *         @OA\Property(property="guard_name", type="string", description="Guard name"),
 *         @OA\Property(property="created_at", type="string", format="date-time", description="Creation date"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", description="Last update date")
 *     }
 * )
 */

/**
 * @OA\Schema(
 *     schema="Role",
 *     type="object",
 *     title="Role",
 *     description="Role model",
 *     properties={
 *         @OA\Property(property="id", type="integer", description="Role ID"),
 *         @OA\Property(property="name", type="string", description="Role name"),
 *         @OA\Property(property="permissions", type="array", @OA\Items(ref="#/components/schemas/Permission"), description="Role permissions"),
 *         @OA\Property(property="created_at", type="string", format="date-time", description="Creation date"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", description="Last update date")
 *     }
 * )
 */
class ApiRoleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/roles",
     *     operationId="getRoles",
     *     tags={"Roles"},
     *     summary="Display a listing of the roles",
     *     description="Get a list of roles with their permissions",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Role")
     *         )
     *     )
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $roles = Role::with('permissions')->get();
        $rolesCount = Role::count();
        $permissions = Permission::all();

        return response()->json([
            'roles'       => RoleResource::collection($roles),
            'rolesCount'  => $rolesCount,
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/roles",
     *     operationId="storeRole",
     *     tags={"Roles"},
     *     summary="Store a newly created role",
     *     description="Create a new role with permissions",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     )
     * )
     */
    public function store(RoleRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $role = Role::create(['name' => $data['name']]);
        if (isset($data['permissions'])) {
            // Используем напрямую переданный массив разрешений
            $role->syncPermissions($data['permissions']);
        }
        $role->load('permissions');

        return response()->json(new RoleResource($role), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/roles/{id}",
     *     operationId="updateRole",
     *     tags={"Roles"},
     *     summary="Update the specified role",
     *     description="Update a specific role by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Role")
     *     )
     * )
     */
    public function update(RoleRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        $role = Role::findById($id);
        $data = $request->validated();
        $role->update(['name' => $data['name']]);
        if (isset($data['permissions'])) {
            // Используем напрямую переданный массив разрешений
            $role->syncPermissions($data['permissions']);
        }
        $role->load('permissions');

        return response()->json(new RoleResource($role));
    }

    /**
     * @OA\Delete(
     *     path="/api/roles/{id}",
     *     operationId="deleteRole",
     *     tags={"Roles"},
     *     summary="Remove the specified role",
     *     description="Delete a specific role by ID",
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
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        $role = Role::findById($id);
        $role->delete();

        return response()->json(null, 204);
    }
}
