<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak.png',
            'photo_type_id' => 1,
            'recipient_id' => 1,
        ]);

        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak2.png',
            'photo_type_id' => 2,
            'recipient_id' => 1,
        ]);

        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak.png',
            'photo_type_id' => 1,
            'recipient_id' => 2,
        ]);

        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak2.png',
            'photo_type_id' => 1,
            'recipient_id' => 3,
        ]);

        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak.png',
            'photo_type_id' => 1,
            'recipient_id' => 4,
        ]);

        DB::table('photos')->insert([
            'title' => '',
            'photo_url' => 'anak2.png',
            'photo_type_id' => 1,
            'recipient_id' => 5,
        ]);
    }
}
