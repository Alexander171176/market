<?php

namespace App\Http\Controllers\Admin\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Admin/Editors/Index');
    }

    public function save(Request $request): \Illuminate\Http\JsonResponse
    {
        $code = $request->input('code');
        return response()->json(['status' => 'success']);
    }
}
