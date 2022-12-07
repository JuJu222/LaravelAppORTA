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
            'id' => 1,
            'username' => 'admin',
            'user_id' => 1,
            'role_id' => 1,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_1',
            'user_id' => 1,
            'role_id' => 1,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_2',
            'user_id' => 2,
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_3',
            'user_id' => 3,
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_4',
            'user_id' => 4,
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);

        DB::table('users')->insert([
            'username' => 'recipient_5',
            'user_id' => 5,
            'role_id' => 3,
            'password' => bcrypt('admin'),
        ]);
    }
}
