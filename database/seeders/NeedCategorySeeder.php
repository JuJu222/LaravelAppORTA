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
            'category' => 'Biaya Sekolah SD',
        ]);

        DB::table('need_categories')->insert([
            'category' => 'Operasi Mata',
        ]);
    }
}
