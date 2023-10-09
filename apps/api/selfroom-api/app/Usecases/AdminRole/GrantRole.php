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

    foreach($role_ids as $ids){
      $roles[$ids] = [
        'granted_at' => $now,
        'granted_by' => $grant_admin_id
      ];
    }

    $ret = $admin->roles()->syncWithoutDetaching($roles);

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
