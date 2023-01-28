<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NeedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('needs')->insert([
            'need_category_id' => 1,
            'recipient_id' => 1,
            'amount' => 100000,
            'due_date' => date('2022-9-5'),
        ]);

        DB::table('needs')->insert([
            'need_category_id' => 2,
            'recipient_id' => 1,
            'amount' => 200000,
            'due_date' => date('2022-9-5'),
        ]);

        DB::table('needs')->insert([
            'need_category_id' => 1,
            'recipient_id' => 2,
            'amount' => 100000,
            'due_date' => date('2022-9-5'),
        ]);

        DB::table('needs')->insert([
            'need_category_id' => 1,
            'recipient_id' => 3,
            'amount' => 100000,
            'due_date' => date('2022-9-5'),
        ]);

        DB::table('needs')->insert([
            'need_category_id' => 2,
            'recipient_id' => 4,
            'amount' => 100000,
            'due_date' => date('2022-9-5'),
        ]);

        DB::table('needs')->insert([
            'need_category_id' => 1,
            'recipient_id' => 5,
            'amount' => 100000,
            'due_date' => date('2022-9-5'),
        ]);
        DB::table('needs')->insert([
            'need_category_id' => 2,
            'recipient_id' => 5,
            'amount' => 200000,
            'due_date' => date('2022-9-5'),
        ]);
    }
}
