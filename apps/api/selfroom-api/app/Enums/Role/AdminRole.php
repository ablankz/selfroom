<?php

declare(strict_types=1);

namespace App\Enums\Role;

enum AdminRole: string
{
  case View = 'ADMIN_VIEW';
  case ManageRole = 'ADMIN_MANAGE_ROLE';
}
