<?php

namespace App\Http\Controllers\Api\Plugin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Plugin\PluginRequest;
use App\Http\Resources\Admin\Plugin\PluginResource;
use App\Models\Admin\Plugin\Plugin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

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
 *     schema="Plugin",
 *     type="object",
 *     title="Plugin",
 *     description="Plugin model",
 *     properties={
 *         @OA\Property(property="id", type="integer", description="Plugin ID"),
 *         @OA\Property(property="name", type="string", description="Plugin name"),
 *         @OA\Property(property="activity", type="boolean", description="Plugin activity"),
 *         @OA\Property(property="sort", type="integer", description="Plugin sort"),
 *         @OA\Property(property="created_at", type="string", format="date-time", description="Creation date"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", description="Last update date")
 *     }
 * )
 */
class ApiPluginController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/plugins",
     *     operationId="getPlugins",
     *     tags={"Plugins"},
     *     summary="Display a listing of the plugins",
     *     description="Get a list of plugins",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Plugin")
     *         )
     *     )
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $plugins = Plugin::all();
        $pluginCount = Plugin::count();

        return response()->json([
            'plugins' => PluginResource::collection($plugins),
            'pluginsCount' => $pluginCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/plugins",
     *     operationId="storePlugin",
     *     tags={"Plugins"},
     *     summary="Store a newly created plugin",
     *     description="Create a new plugin",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Plugin")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Plugin")
     *     )
     * )
     */
    public function store(PluginRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $plugin = Plugin::create($data);

        // Log::info('API - Регистрация модуля создана: ', $plugin->toArray());

        return response()->json(new PluginResource($plugin), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/{id}",
     *     operationId="getPlugin",
     *     tags={"Plugins"},
     *     summary="Display the specified plugin",
     *     description="Get a specific plugin by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Plugin")
     *     )
     * )
     */
    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        $plugin = Plugin::findOrFail($id);

        return response()->json(new PluginResource($plugin));
    }

    /**
     * @OA\Put(
     *     path="/api/plugins/{id}",
     *     operationId="updatePlugin",
     *     tags={"Plugins"},
     *     summary="Update the specified plugin",
     *     description="Update a specific plugin by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Plugin")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Plugin")
     *     )
     * )
     */
    public function update(PluginRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        $plugin = Plugin::findOrFail($id);
        $data = $request->validated();
        $plugin->update($data);

        // Log::info('API - Регистрация модуля обновлена: ', $plugin->toArray());

        return response()->json(new PluginResource($plugin));
    }

    /**
     * @OA\Delete(
     *     path="/api/plugins/{id}",
     *     operationId="deletePlugin",
     *     tags={"Plugins"},
     *     summary="Remove the specified plugin",
     *     description="Delete a specific plugin by ID",
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
        $plugin = Plugin::findOrFail($id);
        $plugin->delete();

        // Log::info('API - Регистрация модуля удалена: ', $plugin->toArray());

        return response()->json(null, 204);
    }

    /**
     * @OA\Patch(
     *     path="/api/plugins/active",
     *     operationId="updatePluginActivity",
     *     tags={"Plugins"},
     *     summary="Update the activity of the specified plugin",
     *     description="Update the activity status of a specific plugin by ID",
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

        // Log::info("API - Обновлено activity модуля с ID: $id с данными: ", $validated);

        $plugin = Plugin::findOrFail($id);
        $plugin->activity = $validated['activity'];
        $plugin->save();

        return response()->json(['success' => true]);
    }

    /**
     * @OA\Patch(
     *     path="/api/plugins/{id}/sort",
     *     operationId="updatePluginSort",
     *     tags={"Plugins"},
     *     summary="Update the sort order of the specified plugin",
     *     description="Update the sort order of a specific plugin by ID",
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
     *             @OA\Property(property="sort", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="success", type="boolean"))
     *     )
     * )
     */
    public function updateSort(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'sort' => 'required|integer',
        ]);

        // Log::info("API - Обновлено sort модуля с ID: $id с данными: ", $validated);

        $plugin = Plugin::findOrFail($id);
        $plugin->sort = $validated['sort'];
        $plugin->save();

        return response()->json(['success' => true]);
    }

    /**
     * @OA\Post(
     *     path="/api/plugins/create-table",
     *     operationId="createPluginTable",
     *     tags={"Plugins"},
     *     summary="Create a table for the specified plugin",
     *     description="Create a table for a specific plugin",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="pluginName", type="string"),
     *             @OA\Property(
     *                 property="fields",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="name", type="string"),
     *                     @OA\Property(property="type", type="string")
     *                 )
     *             ),
     *             @OA\Property(property="initialData", type="array", @OA\Items(type="object"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function createTable(Request $request): \Illuminate\Http\JsonResponse
    {
        $pluginName = $request->input('pluginName');
        $fields = $request->input('fields');

        if (!Schema::hasTable($pluginName)) {
            Schema::create($pluginName, function (Blueprint $table) use ($fields) {
                $table->id();
                foreach ($fields as $field) {
                    $type = $field['type'];
                    $name = $field['name'];
                    if (Schema::hasColumn($table->getTable(), $name)) continue;
                    $table->$type($name)->nullable();
                }
                $table->timestamps();
            });

            $initialData = $request->input('initialData');
            if ($initialData) {
                DB::table($pluginName)->insert($initialData);
            }

            return response()->json(['message' => 'Таблица модуля успешно создана.']);
        }

        return response()->json(['message' => 'Таблица модуля уже существует.']);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/{pluginName}/data",
     *     operationId="getPluginData",
     *     tags={"Plugins"},
     *     summary="Get data from the specified plugin table",
     *     description="Get data from a specific plugin table",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function getPluginData($pluginName): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $pluginData = DB::table($pluginName)->first();
            return response()->json($pluginData);
        }

        return response()->json(['message' => 'Таблица подключаемых модулей не существует.'], 404);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/{pluginName}/settings",
     *     operationId="getPluginSettings",
     *     tags={"Plugins"},
     *     summary="Get settings of the specified plugin",
     *     description="Get settings of a specific plugin by name",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function getPluginSettings(Request $request, $pluginName): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $settings = DB::table($pluginName)->first();
            return response()->json($settings);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Patch(
     *     path="/api/plugins/{pluginName}/settings",
     *     operationId="updatePluginSettings",
     *     tags={"Plugins"},
     *     summary="Update settings of the specified plugin",
     *     description="Update settings of a specific plugin by name",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="success", type="boolean"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function updatePluginSettings(Request $request, $pluginName): \Illuminate\Http\JsonResponse
    {
        $fields = $request->all();

        if (Schema::hasTable($pluginName)) {
            DB::table($pluginName)->update($fields);
            return response()->json(['success' => true]);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/active",
     *     operationId="getActivePlugins",
     *     tags={"Plugins"},
     *     summary="Get active plugins",
     *     description="Get all active plugins",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Plugin")
     *         )
     *     )
     * )
     */
    public function getActivePlugins(): \Illuminate\Http\JsonResponse
    {
        $activePlugins = Plugin::where('activity', true)->get();
        return response()->json($activePlugins);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/{pluginName}/blocks",
     *     operationId="indexBlocks",
     *     tags={"Plugins"},
     *     summary="Get all blocks for a plugin",
     *     description="Get all blocks for a specific plugin",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(type="object"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function indexBlocks(string $pluginName): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $blocks = DB::table($pluginName)->get();
            return response()->json($blocks);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Post(
     *     path="/api/plugins/{pluginName}/blocks",
     *     operationId="storeBlock",
     *     tags={"Plugins"},
     *     summary="Create a new block for a plugin",
     *     description="Create a new block for a specific plugin",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Block successfully created",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function storeBlock(Request $request, string $pluginName): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $data = $request->all();
            $id = DB::table($pluginName)->insertGetId($data);
            $block = DB::table($pluginName)->where('id', $id)->first();
            return response()->json(['message' => 'Блок успешно создан', 'block' => $block], 201);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Get(
     *     path="/api/plugins/{pluginName}/blocks/{id}",
     *     operationId="showBlock",
     *     tags={"Plugins"},
     *     summary="Get a specific block for a plugin",
     *     description="Get a specific block for a plugin by ID",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Block not found or Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function showBlock(string $pluginName, int $id): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $block = DB::table($pluginName)->find($id);
            if ($block) {
                return response()->json($block);
            }
            return response()->json(['message' => 'Блок не найден.'], 404);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Put(
     *     path="/api/plugins/{pluginName}/blocks/{id}",
     *     operationId="updateBlock",
     *     tags={"Plugins"},
     *     summary="Update a specific block for a plugin",
     *     description="Update a specific block for a plugin by ID",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"), @OA\Property(property="block", type="object"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Block not found or Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function updateBlock(Request $request, string $pluginName, int $id): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $updated = DB::table($pluginName)->where('id', $id)->update($request->all());
            if ($updated) {
                $block = DB::table($pluginName)->where('id', $id)->first();
                return response()->json(['message' => 'Блок успешно обновлен', 'block' => $block]);
            }
            return response()->json(['message' => 'Блок не найден.'], 404);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Delete(
     *     path="/api/plugins/{pluginName}/blocks/{id}",
     *     operationId="destroyBlock",
     *     tags={"Plugins"},
     *     summary="Delete a specific block for a plugin",
     *     description="Delete a specific block for a plugin by ID",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Block not found or Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function destroyBlock(string $pluginName, int $id): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $deleted = DB::table($pluginName)->where('id', $id)->delete();
            if ($deleted) {
                return response()->json(['message' => 'Блок успешно удален']);
            }
            return response()->json(['message' => 'Блок не найден.'], 404);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Patch(
     *     path="/api/plugins/{pluginName}/blocks/{id}/sort",
     *     operationId="updateBlockSort",
     *     tags={"Plugins"},
     *     summary="Update the sort order of a specific block for a plugin",
     *     description="Update the sort order of a specific block for a plugin by ID",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
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
     *             @OA\Property(property="sort", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"), @OA\Property(property="block", type="object"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Block not found or Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function updateBlockSort(Request $request, string $pluginName, int $id): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $updated = DB::table($pluginName)->where('id', $id)->update(['sort' => $request->sort]);
            if ($updated) {
                $block = DB::table($pluginName)->where('id', $id)->first();
                return response()->json(['message' => 'Сортировка обновлена успешно', 'блок' => $block]);
            }
            return response()->json(['message' => 'Блок не найден.'], 404);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }

    /**
     * @OA\Patch(
     *     path="/api/plugins/{pluginName}/blocks/{id}/activity",
     *     operationId="updateBlockActivity",
     *     tags={"Plugins"},
     *     summary="Update the activity status of a specific block for a plugin",
     *     description="Update the activity status of a specific block for a plugin by ID",
     *     @OA\Parameter(
     *         name="pluginName",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
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
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"), @OA\Property(property="block", type="object"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Block not found or Table not found",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    public function updateBlockActivity(Request $request, string $pluginName, int $id): \Illuminate\Http\JsonResponse
    {
        if (Schema::hasTable($pluginName)) {
            $updated = DB::table($pluginName)->where('id', $id)->update(['activity' => $request->activity]);
            if ($updated) {
                $block = DB::table($pluginName)->where('id', $id)->first();
                return response()->json(['message' => 'Активность блока успешно обновлена', 'block' => $block]);
            }
            return response()->json(['message' => 'Блок не найден.'], 404);
        }

        return response()->json(['message' => 'Таблица модуля не существует.'], 404);
    }
}
