<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRole\GrantAdminRoleRequest;
use App\Http\Requests\AdminRole\RevokeAdminRoleRequest;
use App\Http\Requests\AdminRole\RevokeAllAdminRoleRequest;
use App\Services\AdminRoleService;
use Illuminate\Http\JsonResponse;

class AdminRoleController extends Controller
{
  protected $service;

  public function __construct(AdminRoleService $service)
  {
    $this->service = $service;
  }

  public function grant(GrantAdminRoleRequest $request, string $adminId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'grant'],
      [
        'admin_id' => $adminId,
        'role_ids' => $request->get('roles'),
        'grant_admin_id' => $request->user()->admin_id
      ]
    ));
  }

  public function revoke(RevokeAdminRoleRequest $request, string $adminId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'revoke'],
      [
        'admin_id' => $adminId,
        'role_ids' => $request->get('roles')
      ]
    ));
  }

  public function revokeAll(RevokeAllAdminRoleRequest $request, string $adminId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'revoke'],
      ['admin_id' => $adminId]
    ));
  }
}
