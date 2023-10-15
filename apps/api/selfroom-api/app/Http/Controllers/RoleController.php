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
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // name 
    $order = $request->order ? urldecode($request->order) : "name";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";

    return response()->success(app()->call(
      [$this->service, 'get'],
      [
        'limit' => $limit,
        'offset' => $offset,
        'order' => $order,
        'order_opt' => $order_opt
      ]
    ));
  }
}
