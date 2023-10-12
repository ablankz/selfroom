<?php

namespace App\Usecases\AdminRole;

use App\Enums\ApplicationCode;
use App\Models\Admin;
use App\Usecases\Usecase;

class GrantRoles extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  /**
   * @param string $admin_id
   * @param int[] $role_ids
   * @param string $grant_admin_id
   */
  public function run(string $admin_id, array $role_ids, string $grant_admin_id)
  {
    $admin = Admin::find($admin_id);

    if (is_null($admin)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    $now = now();
    $roles = [];

    foreach ($role_ids as $ids) {
      $roles[$ids] = [
        'granted_at' => $now,
        'granted_by' => $grant_admin_id
      ];
    }

    $current = $admin->roles->pluck('role_id')->toArray();
    $iter = 0;

    foreach($roles as $id => $role){
      if(!(in_array($id, $current))){
        $admin->roles()->attach($id, $role);
        $iter++;
      }
    }

    return [
      'data' => $iter,
      'code' => self::SUCCESS
    ];
  }
}
