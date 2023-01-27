<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recipients')->insert([
            'user_id' => 3,
            'name' => 'Kenny Jinhiro',
            'nik' => '93210731079',
            'gender' => 'laki-laki',
            'birthplace' => 'Surabaya',
            'birthdate' => date('2002-9-5'),
            'school' => 'Cita Hati',
            'class' => '10',
            'siblings' => 3,
            'child_no' => 1,
            'address' => 'Jl. Bukit Golf',
            'city' => 'Surabaya',
            'phone' => '082193120731',
            'birth_certificate' => 'birth_certificate.png',
            'kartu_keluarga' => 'kartu_keluarga.png',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'user_id' => 4,
            'name' => 'Recipient 1',
            'nik' => '93210731079',
            'gender' => 'laki-laki',
            'birthplace' => 'Surabaya',
            'birthdate' => date('2002-9-5'),
            'school' => 'Cita Hati',
            'class' => '10',
            'siblings' => 3,
            'child_no' => 1,
            'address' => 'Jl. Bukit Golf',
            'city' => 'Surabaya',
            'phone' => '082193120731',
            'birth_certificate' => 'birth_certificate.png',
            'kartu_keluarga' => 'kartu_keluarga.png',
            'note' => 'this is a note for recipient 1',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'user_id' => 5,
            'name' => 'Recipient 2',
            'nik' => '93210731079',
            'gender' => 'laki-laki',
            'birthplace' => 'Surabaya',
            'birthdate' => date('2002-9-5'),
            'school' => 'Cita Hati',
            'class' => '10',
            'siblings' => 3,
            'child_no' => 1,
            'address' => 'Jl. Bukit Golf',
            'city' => 'Surabaya',
            'phone' => '082193120731',
            'birth_certificate' => 'birth_certificate.png',
            'kartu_keluarga' => 'kartu_keluarga.png',
            'note' => 'this is a note for recipient 1',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'user_id' => 6,
            'name' => 'Recipient 3',
            'nik' => '93210731079',
            'gender' => 'laki-laki',
            'birthplace' => 'Surabaya',
            'birthdate' => date('2002-9-5'),
            'school' => 'Cita Hati',
            'class' => '10',
            'siblings' => 3,
            'child_no' => 1,
            'address' => 'Jl. Bukit Golf',
            'city' => 'Surabaya',
            'phone' => '082193120731',
            'birth_certificate' => 'birth_certificate.png',
            'kartu_keluarga' => 'kartu_keluarga.png',
            'note' => 'this is a note for recipient 1',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'user_id' => 7,
            'name' => 'Recipient 4',
            'nik' => '93210731079',
            'gender' => 'laki-laki',
            'birthplace' => 'Surabaya',
            'birthdate' => date('2002-9-5'),
            'school' => 'Cita Hati',
            'class' => '10',
            'siblings' => 3,
            'child_no' => 1,
            'address' => 'Jl. Bukit Golf',
            'city' => 'Surabaya',
            'phone' => '082193120731',
            'birth_certificate' => 'birth_certificate.png',
            'kartu_keluarga' => 'kartu_keluarga.png',
            'note' => 'this is a note for recipient 1',
            'is_active' => false,
        ]);
    }
}
