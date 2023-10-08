<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
  protected $service;
  private $authManager;

  public function __construct(UserService $service, AuthManager $authManager)
  {
    $this->service = $service;
    $this->authManager = $authManager;
  }

  public function find(string $uuid): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['user_id' => $uuid]
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
    $user = app()->call(
      [$this->service, 'create'],
      [
        'login_id' => $request->get('loginId'),
        'raw_password' => $request->get('password'),
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhoto'),
      ]
    );
    $guard = $this->authManager->guard('jwt');
    $token = $guard->login($user);

    return response()->success([
      'accessToken' => $token,
      'expiresIn' => $guard->factory()->getTTL() * 60
    ])->cookie(Cookie::make(
      'token',
      $token,
      config('jwt.refresh_ttl'),  // minutes
      '/',                        // path
      config('sesssion.domain'),   // domain
      config('sesssion.secure'),   // secure
      true,                       // httpOnly
      false,                      // raw
      'lax'                       // samesite
    ));
  }

  public function update(UpdateUserRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'user_id' => $request->user()->user_id,
        'nickname' => $request->get('nickname'),
        'profile_photo_url' => $request->file('profilePhoto'),
      ]
    ));
  }

  public function delete(Request $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['user_id' => $request->user()->user_id]
    ));
  }
}
