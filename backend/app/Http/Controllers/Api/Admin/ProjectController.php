<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Project::with(['order', 'updates'])->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function show(Project $project): JsonResponse
    {
        $project->load(['order', 'updates']);

        return response()->json(['data' => $project]);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'progress' => 'sometimes|integer|between:0,100',
            'current_stage' => 'sometimes|string|max:64',
            'notes' => 'nullable|string|max:5000',
        ]);

        $project->update($validated);

        return response()->json(['data' => $project]);
    }

    public function addUpdate(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
        ]);

        $update = $project->updates()->create($validated);

        return response()->json(['data' => $update], 201);
    }
}