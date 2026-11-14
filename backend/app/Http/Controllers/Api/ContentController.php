<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function portfolio(): JsonResponse
    {
        return response()->json([
            'data' => Portfolio::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function testimonials(): JsonResponse
    {
        return response()->json([
            'data' => Testimonial::where('is_published', true)
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function faqs(): JsonResponse
    {
        return response()->json([
            'data' => Faq::orderBy('sort_order')->get(),
        ]);
    }
}