<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class RobotController extends Controller
{
    protected string $path = 'robots.txt';

    public function index(): Response
    {
        $content = File::exists(public_path($this->path)) ? File::get(public_path($this->path)) : '';
        return Inertia::render('Admin/Systems/RobotEditPage', [
            'content' => $content,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate(['content' => 'required|string']);
        File::put(public_path($this->path), $request->input('content'));

        return redirect()->route('admin.robot.index')->with('success', 'Файл robots.txt обновлён.');
    }
}
