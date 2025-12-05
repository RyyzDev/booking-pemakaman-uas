<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KavlingController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminBookingController;
use App\Http\Controllers\AuthController;

// --- RUTE PUBLIK ---
Route::get('/plots', [KavlingController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/bookings', [BookingController::class, 'store']);

// --- RUTE ADMIN ---
 Route::middleware('auth:sanctum')->group(function () {
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::get('/user', function (Request $request) {
	    return response()->json($request->user());	
	});
    Route::get('/orders', [AdminBookingController::class, 'index']);
    Route::put('/orders/{id}/status', [AdminBookingController::class, 'updateStatus']);
    Route::delete('/orders/{id}', [AdminBookingController::class, 'destroy']);
    Route::post('/plots', [KavlingController::class, 'store']);
    Route::put('/plots/{id}', [KavlingController::class, 'edit']);
    Route::delete('/plots/{id}', [KavlingController::class, 'destroy']);
 });