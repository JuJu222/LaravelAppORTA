<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'admin',
            'role_id' => 1,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_1',
            'role_id' => 1,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_2',
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_3',
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_4',
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_5',
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);
    }
}
