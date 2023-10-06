<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'chat_room_id' => \App\Models\ChatRoom::inRandomOrder()->first()->chat_room_id,
      'user_id' => \App\Models\User::inRandomOrder()->first()->user_id,
      'content' => $this->faker->text(10)
    ];
  }
}
