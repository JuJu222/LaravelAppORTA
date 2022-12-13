<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NeedCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('need_categories')->insert([
            'category' => 'Dyslexia',
        ]);

        DB::table('need_categories')->insert([
            'category' => 'Autisme',
        ]);
    }
}
