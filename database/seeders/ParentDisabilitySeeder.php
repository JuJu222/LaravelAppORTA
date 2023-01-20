<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParentDisabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('disabilities_parents')->insert([
            'disability_id' => 1,
            'parent_id' => 1,
        ]);

        DB::table('disabilities_parents')->insert([
            'disability_id' => 2,
            'parent_id' => 1,
        ]);

        DB::table('disabilities_parents')->insert([
            'disability_id' => 1,
            'parent_id' => 2,
        ]);

        DB::table('disabilities_parents')->insert([
            'disability_id' => 2,
            'parent_id' => 3,
        ]);
    }
}
