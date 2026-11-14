<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Service::with('packages')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $service = Service::create($validated);

        return response()->json(['data' => $service], 201);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $service->update($validated);

        return response()->json(['data' => $service]);
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json(['data' => ['deleted' => true]]);
    }
}