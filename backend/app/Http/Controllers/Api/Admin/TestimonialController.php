<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Testimonial::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'rating' => 'integer|between:1,5',
            'is_published' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json(['data' => $testimonial], 201);
    }

    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'sometimes|string|max:255',
            'message' => 'sometimes|string|max:2000',
            'rating' => 'integer|between:1,5',
            'is_published' => 'boolean',
        ]);

        $testimonial->update($validated);

        return response()->json(['data' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json(['data' => ['deleted' => true]]);
    }
}