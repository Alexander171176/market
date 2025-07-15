<?php

namespace App\Http\Controllers\Api\Section;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Section\SectionRequest;
use App\Http\Resources\Admin\Section\SectionResource;
use App\Models\Admin\Section\Section;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
 *     schema="Section",
 *     type="object",
 *     title="Section",
 *     description="Section model",
 *     properties={
 *         @OA\Property(property="id", type="integer", description="Section ID"),
 *         @OA\Property(property="title", type="string", description="Section title"),
 *         @OA\Property(property="created_at", type="string", format="date-time", description="Creation date"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", description="Last update date")
 *     }
 * )
 */
class ApiSectionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/sections",
     *     operationId="getSections",
     *     tags={"Sections"},
     *     summary="Display a listing of the sections",
     *     description="Get a list of sections",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Section")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $sections = Section::all();
        $sectionsCount = DB::table('sections')->count();

        return response()->json([
            'sections' => SectionResource::collection($sections),
            'sectionsCount' => $sectionsCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/sections",
     *     operationId="storeSection",
     *     tags={"Sections"},
     *     summary="Store a newly created section",
     *     description="Create a new section",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Section")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Section")
     *     )
     * )
     */
    public function store(SectionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $section = Section::create($data);

        Log::info('API - Секция успешно создана: ', $section->toArray());

        return response()->json(new SectionResource($section), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/sections/{id}",
     *     operationId="getSection",
     *     tags={"Sections"},
     *     summary="Display the specified section",
     *     description="Get a specific section by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Section")
     *     )
     * )
     */
    public function show(Section $section): JsonResponse
    {
        return response()->json(new SectionResource($section));
    }

    /**
     * @OA\Put(
     *     path="/api/sections/{id}",
     *     operationId="updateSection",
     *     tags={"Sections"},
     *     summary="Update the specified section",
     *     description="Update a specific section by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Section")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Section")
     *     )
     * )
     */
    public function update(SectionRequest $request, Section $section): JsonResponse
    {
        $data = $request->validated();
        $section->update($data);

        Log::info('API - Секция обновлена: ', $section->toArray());

        return response()->json(new SectionResource($section));
    }

    /**
     * @OA\Delete(
     *     path="/api/sections/{id}",
     *     operationId="deleteSection",
     *     tags={"Sections"},
     *     summary="Remove the specified section",
     *     description="Delete a specific section by ID",
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
    public function destroy(Section $section): JsonResponse
    {
        $section->delete();

        Log::info('API - Секция удалена: ', $section->toArray());

        return response()->json(null, 204);
    }
}
