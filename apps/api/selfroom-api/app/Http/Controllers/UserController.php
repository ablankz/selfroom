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

  public function find(string $userId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['user_id' => $userId]
    ));
  }

  public function get(Request $request): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create | name 
    $order = $request->order ? urldecode($request->order) : "create";
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
        'country' => $request->get('country'),
        'description' => $request->get('description'),
        'email' => $request->get('email'),
        'company' => $request->get('company'),
        'role' => $request->get('role'),
        'school' => $request->get('school')
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
