<?php

namespace App\Http\Controllers\Api\Parameter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Setting\SettingRequest;
use App\Http\Resources\Admin\Setting\SettingResource;
use App\Models\Admin\Setting\Setting;
use Illuminate\Http\Request;

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
 *     schema="Setting",
 *     type="object",
 *     title="Setting",
 *     description="Setting model",
 *     properties={
 *         @OA\Property(property="id", type="integer", description="Setting ID"),
 *         @OA\Property(property="key", type="string", description="Setting key"),
 *         @OA\Property(property="value", type="string", description="Setting value"),
 *         @OA\Property(property="created_at", type="string", format="date-time", description="Creation date"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", description="Last update date")
 *     }
 * )
 */
class ApiParameterController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/parameters",
     *     operationId="getParameters",
     *     tags={"Parameters"},
     *     summary="Display a listing of the parameters",
     *     description="Get a list of parameters",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Setting")
     *         )
     *     )
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $settings = Setting::all();
        $settingCount = Setting::count();

        return response()->json([
            'settings' => SettingResource::collection($settings),
            'settingsCount' => $settingCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/parameters",
     *     operationId="storeParameter",
     *     tags={"Parameters"},
     *     summary="Store a newly created parameter",
     *     description="Create a new parameter",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Setting")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Setting")
     *     )
     * )
     */
    public function store(SettingRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $setting = Setting::create($data);

        // Log::info('API - Параметр системы создан: ', $setting->toArray());

        return response()->json(new SettingResource($setting), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/parameters/{id}",
     *     operationId="updateParameter",
     *     tags={"Parameters"},
     *     summary="Update the specified parameter",
     *     description="Update a specific parameter by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Setting")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Setting")
     *     )
     * )
     */
    public function update(SettingRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        $setting = Setting::findOrFail($id);
        $data = $request->validated();
        $setting->update($data);

        // Log::info('API - Параметр системы обновлен: ', $setting->toArray());

        return response()->json(new SettingResource($setting));
    }

    /**
     * @OA\Delete(
     *     path="/api/parameters/{id}",
     *     operationId="deleteParameter",
     *     tags={"Parameters"},
     *     summary="Remove the specified parameter",
     *     description="Delete a specific parameter by ID",
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
        $setting = Setting::findOrFail($id);
        $setting->delete();

        // Log::info('API - Параметр системы удален: ', $setting->toArray());

        return response()->json(null, 204);
    }

    /**
     * @OA\Patch(
     *     path="/api/parameters/{id}/activity",
     *     operationId="updateParameterActivity",
     *     tags={"Parameters"},
     *     summary="Update the activity of the specified parameter",
     *     description="Update the activity status of a specific parameter by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="activity", type="boolean")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="success", type="boolean"))
     *     )
     * )
     */
    public function updateActivity(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'activity' => 'boolean',
        ]);

        $setting = Setting::findOrFail($id);
        $setting->activity = $validated['activity'];
        $setting->save();

        // Log::info("API - Параметр системы обновлен: ", $setting->toArray());

        return response()->json(['success' => true]);
    }
}
