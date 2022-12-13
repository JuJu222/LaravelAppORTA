<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipientParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recipients_parents')->insert([
            'recipient_id' => 1,
            'parent_id' => 1,
            'relationship_id' => 1,
        ]);

        DB::table('recipients_parents')->insert([
            'recipient_id' => 2,
            'parent_id' => 2,
            'relationship_id' => 2,
        ]);

        DB::table('recipients_parents')->insert([
            'recipient_id' => 3,
            'parent_id' => 3,
            'relationship_id' => 1,
        ]);

        DB::table('recipients_parents')->insert([
            'recipient_id' => 4,
            'parent_id' => 1,
            'relationship_id' => 1,
        ]);

        DB::table('recipients_parents')->insert([
            'recipient_id' => 5,
            'parent_id' => 2,
            'relationship_id' => 2,
        ]);
    }
}
