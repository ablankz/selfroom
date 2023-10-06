<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      \App\Models\Chat::factory(500)->create();
    }
}
