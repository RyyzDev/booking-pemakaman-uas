<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Kavling; // Pastikan Model Kavling sudah ada

class KavlingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama
        Kavling::truncate();

        // Data Kavling
        $plots = [
            ['number' => 'A-01', 'size' => 'Single', 'price' => 25000000.00, 'status' => 'available'],
            ['number' => 'A-02', 'size' => 'Single', 'price' => 25000000.00, 'status' => 'available'],
            ['number' => 'A-03', 'size' => 'Single', 'price' => 25000000.00, 'status' => 'available'],
            ['number' => 'B-01', 'size' => 'Deluxe', 'price' => 45000000.00, 'status' => 'available'],
            ['number' => 'B-02', 'size' => 'Deluxe', 'price' => 45000000.00, 'status' => 'available'],
            ['number' => 'C-01', 'size' => 'Family', 'price' => 75000000.00, 'status' => 'available'],
            ['number' => 'X-10', 'size' => 'Single', 'price' => 25000000.00, 'status' => 'booked'],
            ['number' => 'X-11', 'size' => 'Deluxe', 'price' => 45000000.00, 'status' => 'booked'],
            ['number' => 'Z-20', 'size' => 'Single', 'price' => 25000000.00, 'status' => 'occupied'],
            ['number' => 'Z-21', 'size' => 'Family', 'price' => 75000000.00, 'status' => 'occupied'],
        ];

        DB::table('kavlings')->insert($plots);
    }
}