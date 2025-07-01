<?php

namespace App\Http\Controllers\Api\Permission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Permission\PermissionRequest;
use App\Http\Resources\Admin\Permission\PermissionResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

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
class ApiPermissionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/permissions",
     *     operationId="getPermissions",
     *     tags={"Permissions"},
     *     summary="Display a listing of the permissions",
     *     description="Get a list of permissions",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Permission")
     *         )
     *     )
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $permissions = Permission::all();
        $permissionsCount = DB::table('permissions')->count();

        return response()->json([
            'permissions'      => PermissionResource::collection($permissions),
            'permissionsCount' => $permissionsCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/permissions",
     *     operationId="storePermission",
     *     tags={"Permissions"},
     *     summary="Store a newly created permission",
     *     description="Create a new permission",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Permission")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Permission")
     *     )
     * )
     */
    public function store(PermissionRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $permission = Permission::create(['name' => $data['name']]);

        Log::info('API - Разрешение создано: ', $permission->toArray());

        return response()->json(new PermissionResource($permission), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/permissions/{id}",
     *     operationId="updatePermission",
     *     tags={"Permissions"},
     *     summary="Update the specified permission",
     *     description="Update a specific permission by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Permission")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Permission")
     *     )
     * )
     */
    public function update(PermissionRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        $permission = Permission::findOrFail($id);
        $data = $request->validated();
        $permission->update(['name' => $data['name']]);

        Log::info('API - Разрешение обновлено: ', $permission->toArray());

        return response()->json(new PermissionResource($permission));
    }

    /**
     * @OA\Delete(
     *     path="/api/permissions/{id}",
     *     operationId="deletePermission",
     *     tags={"Permissions"},
     *     summary="Remove the specified permission",
     *     description="Delete a specific permission by ID",
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
        $permission = Permission::findOrFail($id);
        $permission->delete();

        Log::info('API - Разрешение удалено: ', $permission->toArray());

        return response()->json(null, 204);
    }
}
