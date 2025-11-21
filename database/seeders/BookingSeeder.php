<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Kavling;
use App\Models\Booking;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama
        Booking::truncate();

        // Ambil ID Kavling
        $kavlingX10 = Kavling::where('number', 'X-10')->first();
        $kavlingX11 = Kavling::where('number', 'X-11')->first();
        $kavlingZ20 = Kavling::where('number', 'Z-20')->first();

        $bookings = [
            // Status: PENDING (Admin Panel: Belum Diproses)
            [
                'kavling_id' => $kavlingX10->id ?? 1,
                'customer_name' => 'Budi Santoso',
                'email' => 'budi.santo@mail.com',
                'phone' => '081234567890',
                'status' => 'pending',
                'notes' => 'Pemesanan atas nama almarhum ayah.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Status: PROCESSING (Admin Panel: Sedang Diproses)
            [
                'kavling_id' => $kavlingX11->id ?? 2,
                'customer_name' => 'Citra Dewi',
                'email' => 'citra.dewi@email.com',
                'phone' => '087654321098',
                'status' => 'processing',
                'notes' => 'Tolong disiapkan untuk tanggal 10 bulan depan.',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(1),
            ],
            // Status: COMPLETED (Admin Panel: Selesai - kavling Z-20 sudah OCCUPIED)
            [
                'kavling_id' => $kavlingZ20->id ?? 3,
                'customer_name' => 'Ferry Gunawan',
                'email' => 'ferry.g@mail.com',
                'phone' => '085555444333',
                'status' => 'completed',
                'notes' => 'Pembayaran lunas. Mohon kirim sertifikat.',
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(5),
            ],
        ];

        DB::table('bookings')->insert($bookings);
    }
}