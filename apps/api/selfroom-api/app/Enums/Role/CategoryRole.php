<?php

declare(strict_types=1);

namespace App\Enums\Role;

enum CategoryRole: string
{
  case Create = "CATEGORY_CREATE";
  case Delete = "CATEGORY_DELETE";
  case Edit = "CATEGORY_EDIT";
}
