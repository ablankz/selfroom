<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\ViewRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
  protected $service;

  public function __construct(RoleService $service)
  {
    $this->service = $service;
  }

  public function find(ViewRoleRequest $request, int $roleId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['role_id' => $roleId]
    ));
  }

  public function get(ViewRoleRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }
}
