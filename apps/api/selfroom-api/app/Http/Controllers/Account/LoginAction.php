<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Responder\TokenResponder;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class LoginAction extends Controller
{
  private $authManager;

  public function __construct(AuthManager $authManager)
  {
    $this->authManager = $authManager;
  }

  public function __invoke(Request $request, TokenResponder $responder): JsonResponse
  {
    $guard = $this->authManager->guard('jwt');
    $token = $guard->attempt([
      'login_id' => $request->get('login_id'),
      'password' => $request->get('password'),
    ]);

    return $responder(
      $token,
      $guard->factory()->getTTL() * 60
    );
  }
}
