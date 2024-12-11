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
        DB::table('admin_users')->insert([
            'username' => 'admin',
            'password' => Hash::make('123456'), // Encripta la contraseña
            'role' => 'adminSupremo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
