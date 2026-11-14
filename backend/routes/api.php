<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
use App\Http\Controllers\Api\Admin;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Public API endpoints for customer website.
| Admin endpoints require Sanctum authentication.
|
*/

// Public endpoints
Route::get('services', [Api\ServiceController::class, 'index']);
Route::get('services/{slug}', [Api\ServiceController::class, 'show']);
Route::get('portfolio', [Api\ContentController::class, 'portfolio']);
Route::get('testimonials', [Api\ContentController::class, 'testimonials']);
Route::get('faqs', [Api\ContentController::class, 'faqs']);
Route::get('orders/{order_code}', [Api\OrderController::class, 'show']);

// Public order submission
Route::post('orders', [Api\OrderController::class, 'store']);

// Admin authentication
Route::post('admin/login', [Api\AuthController::class, 'login']);

// Protected admin routes
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('logout', [Api\AuthController::class, 'logout']);
    Route::get('me', [Api\AuthController::class, 'me']);

    Route::get('dashboard', [Admin\DashboardController::class, 'stats']);

    // Orders management
    Route::get('orders', [Admin\OrderController::class, 'index']);
    Route::get('orders/{order}', [Admin\OrderController::class, 'show']);
    Route::patch('orders/{order}/status', [Admin\OrderController::class, 'updateStatus']);
    Route::delete('orders/{order}', [Admin\OrderController::class, 'destroy']);

    // Services management
    Route::apiResource('services', Admin\ServiceController::class);

    // Packages management
    Route::apiResource('packages', Admin\PackageController::class);

    // Payments management
    Route::get('payments', [Admin\PaymentController::class, 'index']);
    Route::post('payments', [Admin\PaymentController::class, 'store']);
    Route::post('payments/{payment}/proof', [Admin\PaymentController::class, 'uploadProof']);
    Route::patch('payments/{payment}/verify', [Admin\PaymentController::class, 'verify']);

    // Projects management
    Route::get('projects', [Admin\ProjectController::class, 'index']);
    Route::get('projects/{project}', [Admin\ProjectController::class, 'show']);
    Route::patch('projects/{project}', [Admin\ProjectController::class, 'update']);
    Route::post('projects/{project}/updates', [Admin\ProjectController::class, 'addUpdate']);

    // Portfolio management
    Route::apiResource('portfolio', Admin\PortfolioController::class);

    // Testimonials management
    Route::apiResource('testimonials', Admin\TestimonialController::class);

    // Settings management
    Route::get('settings', [Admin\SettingController::class, 'index']);
    Route::patch('settings', [Admin\SettingController::class, 'update']);
});
