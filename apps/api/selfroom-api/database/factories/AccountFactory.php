<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $notAdmin = $this->faker->randomElement(range(0, 10));
    return [
      'user_id' => $notAdmin ? \App\Models\User::inRandomOrder()->first()->user_id : null,
      'admin_id' => $notAdmin ? null : \App\Models\Admin::inRandomOrder()->first()->admin_id,
      'login_id' => $this->faker->unique()->safeEmail,
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    ];
  }
}
