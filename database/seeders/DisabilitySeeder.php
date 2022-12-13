<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DisabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('disabilities')->insert([
            'disability' => 'Dyslexia',
            'description' => 'This is the description for Dyslexia.',
        ]);

        DB::table('disabilities')->insert([
            'disability' => 'Autisme',
            'description' => 'This is the description for Autisme.',
        ]);
    }
}
