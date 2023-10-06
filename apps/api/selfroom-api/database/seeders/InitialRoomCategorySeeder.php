<?php

namespace Database\Seeders;

use App\Constants\RoomTags;
use Illuminate\Database\Seeder;

class InitialRoomCategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    foreach (RoomTags::INITIAL_ROOM_CATEGORIES as $category) {
      \App\Models\RoomCategory::create(
        [
          'name' => $category,
        ]
      );
    }
  }
}
