<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
use App\Http\Requests\Admin\ViewAdminRequest;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
  protected $service;

  public function __construct(AdminService $service)
  {
    $this->service = $service;
  }

  public function find(ViewAdminRequest $request, string $adminId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['admin_id' => $adminId]
    ));
  }

  public function get(ViewAdminRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }

  public function create(StoreAdminRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'created_by' => $request->user()->admin_id,
        'login_id' => $request->get('loginId'),
        'raw_password' => $request->get('password'),
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhoto'),
      ]
    ));
  }

  public function update(UpdateAdminRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'admin_id' => $request->user()->admin_id,
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhoto'),
      ]
    ));
  }

  public function delete(Request $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['admin_id' => $request->user()->admin_id]
    ));
  }
}
