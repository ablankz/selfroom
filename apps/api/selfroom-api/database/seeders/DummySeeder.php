<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DummySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // テスト用アカウント
    \App\Models\Account::create(
      [
        'login_id' => 'admin',
        'password' => app('hash')->make('admin'),
        'is_active' => true
      ]
    );
  }
}
