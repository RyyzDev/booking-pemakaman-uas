<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cek dan buat user admin
        if (DB::table('users')->where('email', 'admin@cemetery.com')->doesntExist()) {
            DB::table('users')->insert([
                'name' => 'Super Admin',
                'email' => 'admin@cemetery.com',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}