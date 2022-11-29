<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            'id' => 1,
            'role' => 'admin',
        ]);

        DB::table('user_roles')->insert([
            'id' => 2,
            'role' => 'donor',
        ]);

        DB::table('user_roles')->insert([
            'id' => 3,
            'role' => 'recipient',
        ]);
    }
}
