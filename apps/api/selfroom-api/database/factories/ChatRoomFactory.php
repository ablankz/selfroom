<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatRoom>
 */
class ChatRoomFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $notLock = $this->faker->randomElement(range(0, 3));
    return [
      'name' => $this->faker->company,
      'cover_photo_url' => $this->faker->boolean ? $this->faker->imageUrl : null,
      'room_key' => $notLock ? null : '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
    ];
  }
}
