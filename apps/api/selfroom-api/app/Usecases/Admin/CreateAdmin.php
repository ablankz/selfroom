<?php

namespace App\Usecases\Admin;

use App\Enums\Role\AdminRole;
use App\Models\Account;
use App\Models\Admin;
use App\Models\Role;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateAdmin extends Usecase
{
  public function run(
    string $login_id,
    string $raw_passsword,
    string $nickname,
    string $profile_photo_url,
  ) {
    $data = DB::transaction(function () use (
      $login_id,
      $raw_passsword,
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
            'login_id' => $login_id,
            'password' => app('hash')->make($raw_passsword),
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
