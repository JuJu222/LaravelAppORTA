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
            'name' => 'Recipient 1',
            'nik' => '',
            'gender' => 'laki-laki',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'school' => '',
            'class' => '',
            'siblings' => 1,
            'child_no' => 1,
            'address' => '',
            'city' => '',
            'phone' => '',
            'parent_id' => 1,
            'birth_certificate' => '',
            'kartu_keluarga' => '',
            'note' => '',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'name' => 'Recipient 2',
            'nik' => '',
            'gender' => 'laki-laki',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'school' => '',
            'class' => '',
            'siblings' => 1,
            'child_no' => 1,
            'address' => '',
            'city' => '',
            'phone' => '',
            'parent_id' => 1,
            'birth_certificate' => '',
            'kartu_keluarga' => '',
            'note' => '',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'name' => 'Recipient 3',
            'nik' => '',
            'gender' => 'laki-laki',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'school' => '',
            'class' => '',
            'siblings' => 1,
            'child_no' => 1,
            'address' => '',
            'city' => '',
            'phone' => '',
            'parent_id' => 1,
            'birth_certificate' => '',
            'kartu_keluarga' => '',
            'note' => '',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'name' => 'Recipient 4',
            'nik' => '',
            'gender' => 'laki-laki',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'school' => '',
            'class' => '',
            'siblings' => 1,
            'child_no' => 1,
            'address' => '',
            'city' => '',
            'phone' => '',
            'parent_id' => 1,
            'birth_certificate' => '',
            'kartu_keluarga' => '',
            'note' => '',
            'is_active' => true,
        ]);

        DB::table('recipients')->insert([
            'name' => 'Recipient 5',
            'nik' => '',
            'gender' => 'laki-laki',
            'birthplace' => '',
            'birthdate' => date('2022-9-5'),
            'school' => '',
            'class' => '',
            'siblings' => 1,
            'child_no' => 1,
            'address' => '',
            'city' => '',
            'phone' => '',
            'parent_id' => 1,
            'birth_certificate' => '',
            'kartu_keluarga' => '',
            'note' => '',
            'is_active' => true,
        ]);
    }
}
