<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Recipient;
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
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ParentSeeder::class,
            NeedCategorySeeder::class,
            DisabilitySeeder::class,
            RecipientSeeder::class,
            DonorSeeder::class,
            RelationshipSeeder::class,
            NeedSeeder::class,
            RecipientParentSeeder::class,
            RecipientDisabilitySeeder::class
        ]);
    }
}
