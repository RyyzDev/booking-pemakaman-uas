<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model { 
    protected $fillable = [
        'kavling_id', 
        'customer_name', 
        'email', 
        'phone', 
        'status', 
        'notes'
    ];

    public function kavling() {
        return $this->belongsTo(Kavling::class); 
    }

    public function getStatusLabelAttribute() {
        return match($this->status) {
            'pending' => 'Belum Diproses',
            'processing' => 'Sedang Diproses',
            'ready' => 'Siap Digunakan',
            'completed' => 'Selesai',
            default => 'Unknown'
        };
    }
}