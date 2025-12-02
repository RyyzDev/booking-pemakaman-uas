<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Kavling;   

class AdminBookingController extends Controller
{ 
 
	public function index() 
	{
		// Ambil semua booking dengan relasi kavling (dan customer jika ada)
		$orders = Booking::with('kavling')->orderBy('id', 'desc')->get();
		return response()->json(['orders' => $orders]);
	}

			
	public function updateStatus(Request $request, $id) 
	{
		$booking = Booking::findOrFail($id); 
		
		// Validasi input
		$request->validate([
			'status' => 'required|in:pending,processing,ready,completed'
		]);

		$booking->status = $request->status;
		$booking->save();

		$kavling = $booking->kavling;

			if ($kavling) {
				if ($request->status == 'completed') {
					// Jika booking completed, kavling jadi occupied
					$kavling->status = 'occupied';
				} else {
					// (pending, processing, ready), kavling jadi booked
					$kavling->status = 'booked';
				}
			
				$kavling->save();
			}

		$booking->load('kavling');

		return response()->json(['message' => 'Status pesanan berhasil diperbarui.', 'booking' => $booking]);
	}
}