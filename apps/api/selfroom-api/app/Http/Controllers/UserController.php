<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
  protected $service;

  public function __construct(UserService $service)
  {
    $this->service = $service;
  }

  public function find(string $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['user_id' => $id]
    ));
  }

  public function get(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }

  public function create(StoreUserRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'login_id' => $request->get('loginId'),
        'raw_password' => $request->get('password'),
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhotoUrl'),
      ]
    ));
  }

  public function update(UpdateUserRequest $request, string $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'user_id' => $id,
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhotoUrl'),
      ]
    ));
  }

  public function delete(string $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['user_id' => $id]
    ));
  }
}
