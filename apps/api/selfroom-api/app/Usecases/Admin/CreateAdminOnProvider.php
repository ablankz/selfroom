<?php

namespace App\Usecases\Admin;

use App\Enums\Role\AdminRole;
use App\Models\Account;
use App\Models\Admin;
use App\Models\Role;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateAdminOnProvider extends Usecase
{
  public function run(
    string $provider_id,
    string $provider_name,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $data = DB::transaction(function () use (
      $provider_id,
      $provider_name,
      $nickname,
      $profile_photo_url,
    ) {
      try {
        $admin = Admin::create(
          [
            'nickname' => $nickname,
            'profile_photo_url' => $profile_photo_url
          ]
        );
        $account = Account::create(
          [
            'provider_id' => $provider_id,
            'provider_name' => $provider_name,
            'admin_id' => $admin->admin_id,
          ]
        );
        $role = Role::where('name', AdminRole::View)->first();
        $account->roles()->attach($role->role_id, ['granted_at' => now()]);
        return $account;
      } catch (\Throwable) {
        DB::rollBack();
      }
    });

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
