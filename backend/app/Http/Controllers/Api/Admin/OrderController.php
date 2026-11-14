<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');

        $orders = Order::with(['details.service', 'project'])
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json(['data' => $orders]);
    }

    public function show(Order $order): JsonResponse
    {
        $order->load(['details.service', 'details.package', 'files', 'payments', 'project.updates']);

        return response()->json(['data' => $order]);
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(Order::STATUSES)],
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json(['data' => ['status' => $order->status]]);
    }

    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json(['data' => ['deleted' => true]]);
    }
}