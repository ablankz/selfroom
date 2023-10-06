<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ChatRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      \App\Models\ChatRoom::factory(50)->create();
    }
}
