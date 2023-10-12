<?php

namespace Database\Seeders;

use App\Constants\AdminPermissions;
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

  private function create(): void
  {
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
        foreach (AdminPermissions::DEFAULT_INITIAL_ADMIN_ROLE as $role) {
          $role = \App\Models\Role::where('name', $role->value)->first();
          $admin->roles()->attach($role->role_id, ['granted_at' => now()]);
        }
      } catch (\Throwable) {
        DB::rollBack();
      }
    });
  }
}
