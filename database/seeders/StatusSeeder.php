<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status')->insert([
            'status' => 'Perlu Bantuan',
        ]);

        DB::table('status')->insert([
            'status' => 'Bantuan Ditutup',
        ]);

        DB::table('status')->insert([
            'status' => 'Telah Disalurkan',
        ]);
    }
}
