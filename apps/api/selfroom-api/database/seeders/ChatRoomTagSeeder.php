<?php

namespace Database\Seeders;

use App\Constants\RoomTags;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ChatRoomTagSeeder extends Seeder
{
  protected $faker;

  public function __construct()
  {
    $this->faker = Faker::create('ja_JP');
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $models = \App\Models\ChatRoom::inRandomOrder()->get();

    foreach ($models as $model) {
      $attach = $this->faker->numberBetween(RoomTags::ROOM_MIN_TAGS, RoomTags::ROOM_MAX_TAGS);
      $targets = \App\Models\RoomCategory::inRandomOrder()->get();
      foreach ($targets as $i => $target) {
        if ($i === $attach) break;
        $model->categories()->attach($target->room_category_id);
      }
    }
  }
}
