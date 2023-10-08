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
    $initialAdminAccount = \App\Models\Account::where('login_id', env('INITIAL_ADMIN_ID'))->first();
    $models = \App\Models\Admin::whereNot('admin_id', $initialAdminAccount->admin_id)->inRandomOrder()->get();
    $adminView = \App\Models\Role::where('name', AdminRole::View->value)->first();

    foreach ($models as $model) {
      $attach = $this->faker->numberBetween(1, 3);
      $model->roles()->attach($adminView->role_id, ['granted_at' => $this->faker->dateTime]);
      $targets = \App\Models\Role::inRandomOrder()->whereNotIn('name', [AdminRole::ManageRole->value, AdminRole::Create->value, AdminRole::View->value])->get();
      foreach ($targets as $i => $target) {
        if ($i === $attach) break;
        $model->roles()->attach($target->role_id, ['granted_at' => $this->faker->dateTime]);
      }
    }
  }
}
