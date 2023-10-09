<?php

namespace App\Usecases\AdminRole;

use App\Enums\ApplicationCode;
use App\Models\Admin;
use App\Usecases\Usecase;

class RevocationRolesOnAdmin extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  /**
   * @param string $admin_id
   */
  public function run(string $admin_id)
  {
    $admin = Admin::find($admin_id);

    if (is_null($admin)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $ret = $admin->roles()->detach();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
