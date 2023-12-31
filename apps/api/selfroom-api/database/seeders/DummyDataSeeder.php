<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $this->call(DummyAcountSeeder::class);
      $this->call(DummyChatRoomSeeder::class);
    }
}
