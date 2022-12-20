<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipientDisabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('disabilities_recipients')->insert([
            'disability_id' => 1,
            'recipient_id' => 1,
            'note' => '',
        ]);

        DB::table('disabilities_recipients')->insert([
            'disability_id' => 1,
            'recipient_id' => 2,
            'note' => '',
        ]);

        DB::table('disabilities_recipients')->insert([
            'disability_id' => 1,
            'recipient_id' => 3,
            'note' => '',
        ]);

        DB::table('disabilities_recipients')->insert([
            'disability_id' => 2,
            'recipient_id' => 4,
            'note' => '',
        ]);

        DB::table('disabilities_recipients')->insert([
            'disability_id' => 1,
            'recipient_id' => 5,
            'note' => '',
        ]);
        DB::table('disabilities_recipients')->insert([
            'disability_id' => 2,
            'recipient_id' => 5,
            'note' => '',
        ]);
    }
}
