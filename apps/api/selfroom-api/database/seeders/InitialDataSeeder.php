<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $this->call(InitialRoleSeeder::class);
      $this->call(InitialRoomCategorySeeder::class);
      $this->call(InitialAdminSeeder::class);
    }
}
