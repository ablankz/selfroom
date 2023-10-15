<?php

namespace App\Services;

use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\Role\SimplifiedRoleResourceCollection;
use App\Usecases\Role\FindRole;
use App\Usecases\Role\GetRoles;

class RoleService
{
  public function find(FindRole $usecase, int $role_id)
  {
    return new RoleResource($usecase->handle($role_id));
  }

  public function get(
    GetRoles $usecase,
    int $limit,
    int $offset,
    string $order,
    string $order_opt
  ) {
    return new SimplifiedRoleResourceCollection($usecase->handle($limit, $offset, $order, $order_opt));
  }
}
