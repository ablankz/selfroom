<?php

namespace App\Usecases\Admin;

use App\Constants\AdminPermissions;
use App\Models\Account;
use App\Models\Admin;
use App\Models\Role;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateAdmin extends Usecase
{
  public function run(
    string $created_by,
    string $login_id,
    string $raw_password,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $data = DB::transaction(function () use (
      $created_by,
      $login_id,
      $raw_password,
      $nickname,
      $profile_photo_url,
    ) {
      try {
        $admin = Admin::create(
          [
            'created_by' => $created_by,
            'nickname' => $nickname,
            'profile_photo_url' => $profile_photo_url
          ]
        );
        Account::create(
          [
            'login_id' => $login_id,
            'password' => app('hash')->make($raw_password),
            'admin_id' => $admin->admin_id,
          ]
        );
        foreach(AdminPermissions::DEFAULT_ADMIN_ROLE as $role){
          $role = Role::where('name', $role->value)->first();
          $admin->roles()->attach($role->role_id, ['granted_at' => now()]);
        }
        return $admin;
      } catch (\Throwable $e) {
        DB::rollBack();
        throw $e;
      }
    });

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
