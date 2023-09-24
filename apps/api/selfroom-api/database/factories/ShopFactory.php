<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop>
 */
class ShopFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $plans = ['スタンダード', 'プレミアム'];
    return [
      'name' => $this->faker->company,
      'address' => $this->faker->address,
      'mailaddress' => $this->faker->safeEmail,
      'site_url' => $this->faker->url,
      'tel' => $this->faker->phoneNumber,
      'fax' => $this->faker->phoneNumber,
      'charge' => $this->faker->name,
      'plan' => $this->faker->randomElement($plans),
      'is_open' => $this->faker->boolean,
    ];
  }
}
