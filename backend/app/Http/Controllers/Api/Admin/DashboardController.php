<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $orders = Order::count();
        $newOrders = Order::where('status', 'menunggu_konfirmasi')->count();
        $inProgress = Order::where('status', 'dalam_pengerjaan')->count();
        $completed = Order::where('status', 'selesai')->count();

        $totalCustomers = Order::distinct('email')->count('email');
        $totalRevenue = (float) Order::where('status', 'selesai')->sum('budget');

        // Chart data: orders per month (last 12 months)
        $chart = Order::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'data' => [
                'total_orders' => $orders,
                'new_orders' => $newOrders,
                'in_progress' => $inProgress,
                'completed' => $completed,
                'total_customers' => $totalCustomers,
                'total_revenue' => $totalRevenue,
                'chart' => $chart,
            ],
        ]);
    }
}