<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('parents')->insert([
            'name' => 'Parent 1',
            'nik' => '',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'occupation' => '',
            'address' => '',
            'phone' => '',
            'ktp_image' => '',
        ]);

        DB::table('parents')->insert([
            'name' => 'Parent 2',
            'nik' => '',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'occupation' => '',
            'address' => '',
            'phone' => '',
            'ktp_image' => '',
        ]);

        DB::table('parents')->insert([
            'name' => 'Parent 3',
            'nik' => '',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'occupation' => '',
            'address' => '',
            'phone' => '',
            'ktp_image' => '',
        ]);
    }
}
