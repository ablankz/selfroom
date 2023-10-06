<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call(InitialDataSeeder::class);
    if (config('app.debug')) {
      $this->call(DummyAcountSeeder::class);
      $this->call(UserSeeder::class);
      $this->call(AdminSeeder::class);
      $this->call(AccountSeeder::class);
      $this->call(ChatRoomSeeder::class);
      $this->call(ChatSeeder::class);
    }
  }
}
