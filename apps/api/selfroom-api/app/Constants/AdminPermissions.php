<?php

namespace App\Constants;

use App\Enums\Role\AdminRole;
use App\Enums\Role\PermissionRole;

class AdminPermissions
{
  public const DEFAULT_INITIAL_ADMIN_ROLE = [
    AdminRole::Create,
    AdminRole::ManageRole,
    AdminRole::View,
    PermissionRole::View,
  ];

  public const DEFAULT_ADMIN_ROLE = [
    AdminRole::View,
    PermissionRole::View
  ];
}
