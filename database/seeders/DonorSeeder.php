<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DonorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('donors')->insert([
            'user_id' => 2,
            'name' => 'Donor 1',
            'name_alias' => 'Alias',
            'ktp' => 'KTP',
            'email' => 'donor@gmail.com',
            'address' => 'Jl. Donor Address',
            'city' => 'Surabaya',
            'phone' => '031281231',
            'note' => 'catatan',
            'verified' => true,
        ]);
    }
}
