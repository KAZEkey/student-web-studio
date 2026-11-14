<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Portfolio::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:64',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|string|max:500',
            'project_url' => 'nullable|string|max:500',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $portfolio = Portfolio::create($validated);

        return response()->json(['data' => $portfolio], 201);
    }

    public function update(Request $request, Portfolio $portfolio): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'category' => 'nullable|string|max:64',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|string|max:500',
            'project_url' => 'nullable|string|max:500',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $portfolio->update($validated);

        return response()->json(['data' => $portfolio]);
    }

    public function destroy(Portfolio $portfolio): JsonResponse
    {
        $portfolio->delete();

        return response()->json(['data' => ['deleted' => true]]);
    }
}