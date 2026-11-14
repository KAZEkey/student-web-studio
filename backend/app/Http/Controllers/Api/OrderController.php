<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'required|string|max:32',
            'project_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'budget' => 'nullable|numeric|min:0',
            'deadline' => 'nullable|date|after_or_equal:today',
            'service_id' => 'required|exists:services,id',
            'package_id' => 'nullable|exists:packages,id',
        ]);

        $order = Order::create([
            'order_code' => Order::generateCode(),
            'customer_name' => $validated['customer_name'],
            'email' => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'project_name' => $validated['project_name'],
            'description' => $validated['description'] ?? null,
            'budget' => $validated['budget'] ?? null,
            'deadline' => $validated['deadline'] ?? null,
            'status' => 'menunggu_konfirmasi',
        ]);

        $order->details()->create([
            'service_id' => $validated['service_id'],
            'package_id' => $validated['package_id'] ?? null,
            'price_snapshot' => 0,
        ]);

        return response()->json([
            'data' => [
                'order_code' => $order->order_code,
                'customer_name' => $order->customer_name,
                'project_name' => $order->project_name,
                'status' => $order->status,
            ],
        ], 201);
    }

    public function show(string $order_code): JsonResponse
    {
        $order = Order::where('order_code', $order_code)
            ->with(['details.service', 'details.package', 'project.updates'])
            ->firstOrFail();

        return response()->json([
            'data' => [
                'order_code' => $order->order_code,
                'customer_name' => $order->customer_name,
                'project_name' => $order->project_name,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'details' => $order->details,
                'project' => $order->project,
            ],
        ]);
    }
}