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
   */
  public function run(string $admin_id, array $role_ids)
  {
    $admin = Admin::find($admin_id);

    if (is_null($admin)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    $ret = $admin->roles()->syncWithoutDetaching($role_ids);

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
