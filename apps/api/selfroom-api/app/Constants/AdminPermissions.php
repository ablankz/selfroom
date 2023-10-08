<?php

namespace App\Constants;

use App\Enums\Role\AdminRole;

class AdminPermissions
{
  public const DEFAULT_INITIAL_ADMIN_ROLE = [
    AdminRole::Create,
    AdminRole::ManageRole,
    AdminRole::View
  ];

  public const DEFAULT_ADMIN_ROLE = [
    AdminRole::View
  ];
}
