<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Kavling;

class KavlingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama
        Kavling::truncate();
        $plots = [];
        $plot_counter = 1;
        $sections = ['A', 'B', 'C', 'D'];
        $prices = [
            'Single' => 25000000.00,
            'Deluxe' => 45000000.00,
            'Family' => 75000000.00,
        ];
        $timestamp = now();

        for ($i = 0; $i < 36; $i++) {
            $section_index = floor($i / 9);
            $section_char = $sections[$section_index];
            $number = sprintf('%s-%02d', $section_char, $plot_counter++);

            if ($i % 3 == 0) {
                $size = 'Single';
            } elseif ($i % 3 == 1) {
                $size = 'Deluxe';
            } else {
                $size = 'Family';
            }
            $price = $prices[$size];

            if ($i < 22) {
                $status = 'available';
            } elseif ($i < 30) {
                $status = 'booked';
            } else {
                $status = 'occupied';
            }

            $plots[] = [
                'number' => $number,
                'size' => $size,
                'price' => $price,
                'status' => $status,
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ];
        }


        DB::table('kavlings')->insert($plots);
    }
}