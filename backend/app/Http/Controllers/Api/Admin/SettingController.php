<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Setting::orderBy('setting_key')->get(),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string|max:255',
            'settings.*.value' => 'nullable|string|max:5000',
        ]);

        foreach ($validated['settings'] as $item) {
            Setting::updateOrCreate(
                ['setting_key' => $item['key']],
                ['setting_value' => $item['value']]
            );
        }

        return response()->json(['data' => Setting::all()]);
    }
}