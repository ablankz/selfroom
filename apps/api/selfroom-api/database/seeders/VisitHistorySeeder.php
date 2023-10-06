<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class VisitHistorySeeder extends Seeder
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
    $models = \App\Models\User::inRandomOrder()->get();

    foreach ($models as $model) {
      $attach = $this->faker->numberBetween(0, 20);
      $targets = \App\Models\ChatRoom::inRandomOrder()->get();
      foreach ($targets as $i => $target) {
        if ($i === $attach) break;
        $model->visitedRooms()->attach($target->chat_room_id, ['visited_at' => $this->faker->dateTime, 'left_at' => $this->faker->dateTime]);
      }
    }
  }
}
