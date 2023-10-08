<?php

namespace Database\Seeders;

use App\Enums\Role\AdminRole;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AdminRoleSeeder extends Seeder
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
    $models = \App\Models\Admin::inRandomOrder()->get();

    foreach ($models as $model) {
      $attach = $this->faker->numberBetween(1, 3);
      $targets = \App\Models\Role::inRandomOrder()->whereNot('name', AdminRole::ManageRole->value)->get();
      foreach ($targets as $i => $target) {
        if ($i === $attach) break;
        $model->roles()->attach($target->role_id, ['granted_at' => $this->faker->dateTime]);
      }
    }
  }
}
