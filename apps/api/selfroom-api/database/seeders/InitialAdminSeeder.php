<?php

namespace Database\Seeders;

use App\Enums\Role\AdminRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InitialAdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $this->create();
  }

  private function create(
  ): void {
    DB::transaction(function () {
      try {
        $admin = \App\Models\Admin::create(
          [
            'nickname' => '管理者ユーザー',
            'profile_photo_url' => null
          ]
        );
        \App\Models\Account::create(
          [
            'login_id' => env('INITIAL_ADMIN_ID'),
            'password' => app('hash')->make(env('INITIAL_ADMIN_PASSWORD')),
            'admin_id' => $admin->admin_id,
          ]
        );
        $role = \App\Models\Role::where('name', AdminRole::ManageRole->value)->first();
        $admin->roles()->attach($role->role_id, ['granted_at' => now()]);
      } catch (\Throwable) {
        DB::rollBack();
      }
    });
  }
}
