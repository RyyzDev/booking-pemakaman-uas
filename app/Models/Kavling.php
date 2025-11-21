<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kavling extends Model
{
    
    protected $fillable = [
        'number', 
        'size',   
        'price',  
        'status',
    ];

    // Relasi ke Booking
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getStatusLabelAttribute() {
        return match($this->status) {
            'available' => 'Tersedia',
            'booked' => 'Menunggu Proses',
            'occupied' => 'Terisi',
            default => 'Unknown'
        };
    }
}