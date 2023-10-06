<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class DummyAcountSeeder extends Seeder
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
    $this->dummyAccount('test_user', 'test_user', false, 'テストユーザー');
    $this->dummyAccount('admin_user', 'admin_user', true, '管理者ユーザー');
  }

  private function dummyAccount(
    string $login_id,
    string $raw_passsword,
    bool $admin = false,
    string $nickname = null,
    string $profile_photo_url = null,
  ): void {
    DB::transaction(function () use (
      $login_id,
      $raw_passsword,
      $admin,
      $nickname,
      $profile_photo_url,
    ) {
      try {
        if ($admin) {
          $admin = \App\Models\Admin::create(
            [
              'nickname' => $nickname ?? $this->faker->name,
              'profile_photo_url' => $profile_photo_url ?? $this->faker->imageUrl
            ]
          );
        } else {
          $user = \App\Models\User::create(
            [
              'nickname' => $nickname ?? $this->faker->name,
              'profile_photo_url' => $profile_photo_url ?? $this->faker->imageUrl
            ]
          );
        }
        \App\Models\Account::create(
          [
            'login_id' => $login_id,
            'password' => app('hash')->make($raw_passsword),
            'user_id' => $admin ? null : $user->user_id,
            'admin_id' => $admin ? $admin->admin_id : null,
          ]
        );
      } catch (\Throwable) {
        DB::rollBack();
      }
    });
  }
}
