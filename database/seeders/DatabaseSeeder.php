<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

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
