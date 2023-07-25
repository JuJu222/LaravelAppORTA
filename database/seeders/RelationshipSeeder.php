<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('relationships')->insert([
            'relationship' => 'Ibu'
        ]);

        DB::table('relationships')->insert([
            'relationship' => 'Ayah'
        ]);

        DB::table('relationships')->insert([
            'relationship' => 'Paman'
        ]);

        DB::table('relationships')->insert([
            'relationship' => 'Bibi'
        ]);

        DB::table('relationships')->insert([
            'relationship' => 'Lainnya'
        ]);
    }
}
