<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kavling;
use Illuminate\Http\Request;

class BookingController extends Controller
{ 
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'kavling_id' => [
                'required', 
                'exists:kavlings,id,status,available', 
            ],
            // -------------------------------
            'customer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address'=>'required',
            'notes' => 'nullable|string',
        ]);

        $booking = Booking::create(array_merge($validatedData, [
            'status' => 'pending', 
        ]));

        $kavling = Kavling::findOrFail($validatedData['kavling_id']);
        $kavling->update(['status' => 'booked']);

        // Respon sukses
        return response()->json(['message' => 'Booking berhasil dibuat.', 'booking' => $booking], 201);
    }
}