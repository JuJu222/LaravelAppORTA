<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NeedLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('need_logs')->insert([
            'need_id' => 1,
            'status_id' => 1,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 2,
            'status_id' => 2,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 3,
            'status_id' => 3,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 4,
            'status_id' => 1,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 5,
            'status_id' => 2,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 6,
            'status_id' => 3,
            'status_date' => Carbon::now(),
        ]);

        DB::table('need_logs')->insert([
            'need_id' => 7,
            'status_id' => 1,
            'status_date' => Carbon::now(),
        ]);
    }
}
