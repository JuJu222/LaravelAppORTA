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
            'user_id' => 1,
            'name' => 'Admin Donor 5',
            'name_alias' => '',
            'ktp' => '222',
            'email' => '',
            'address' => '',
            'city' => '',
            'phone' => '',
            'photo' => '',
            'note' => '',
        ]);
    }
}
