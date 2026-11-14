<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Payment::with('order')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string|max:64',
        ]);

        $payment = Payment::create([
            ...$validated,
            'status' => 'menunggu_verifikasi',
        ]);

        return response()->json(['data' => $payment], 201);
    }

    public function uploadProof(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $path = $request->file('proof')->store('payment-proofs', 'private');

        $payment->update(['proof_path' => $path]);

        return response()->json(['data' => ['proof_path' => $path]]);
    }

    public function verify(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['menunggu_verifikasi', 'terverifikasi', 'ditolak'])],
        ]);

        $payment->update([
            'status' => $validated['status'],
            'paid_at' => $validated['status'] === 'terverifikasi' ? now() : null,
        ]);

        return response()->json(['data' => $payment]);
    }
}