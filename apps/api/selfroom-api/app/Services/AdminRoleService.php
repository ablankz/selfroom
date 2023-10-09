<?php

namespace App\Services;

use App\Usecases\AdminRole\GrantRoles;
use App\Usecases\AdminRole\RevokeRoles;
use App\Usecases\AdminRole\RevokeRolesOnAdmin;

class AdminRoleService
{
  public function grant(GrantRoles $usecase, string $admin_id, array $role_ids)
  {
    return $usecase->handle($admin_id, $role_ids);
  }

  public function revoke(RevokeRoles $usecase, string $admin_id, array $role_ids)
  {
    return $usecase->handle($admin_id, $role_ids);
  }

  public function revokeOnAdmin(RevokeRolesOnAdmin $usecase, string $admin_id)
  {
    return $usecase->handle($admin_id);
  }
}
