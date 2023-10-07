<?php

declare(strict_types=1);

use App\Enums\Role\AccountRole;
use App\Enums\Role\AdminRole;
use App\Enums\Role\CategoryRole;
use App\Enums\Role\ChatRole;
use App\Enums\Role\ChatRoomRole;

if (!function_exists('get_all_roles')) {

  function get_all_roles(): array
  {
    $roles = [
      ...AccountRole::cases(),
      ...CategoryRole::cases(),
      ...ChatRole::cases(),
      ...ChatRoomRole::cases(),
      ...AdminRole::cases(),
    ];
    return array_map(function($role){
      return $role->value;
    }, $roles);
  }
}
