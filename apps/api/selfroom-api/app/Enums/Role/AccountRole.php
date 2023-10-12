<?php

declare(strict_types=1);

namespace App\Enums\Role;

enum AccountRole: string
{
  case View = "ACCOUNT_VIEW";
  case Delete = "ACCOUNT_DELETE";
}
