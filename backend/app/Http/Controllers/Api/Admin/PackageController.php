<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Package::with('service')->orderBy('service_id')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'timeline' => 'nullable|string|max:64',
        ]);

        $package = Package::create($validated);

        return response()->json(['data' => $package], 201);
    }

    public function update(Request $request, Package $package): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'timeline' => 'nullable|string|max:64',
        ]);

        $package->update($validated);

        return response()->json(['data' => $package]);
    }

    public function destroy(Package $package): JsonResponse
    {
        $package->delete();

        return response()->json(['data' => ['deleted' => true]]);
    }
}