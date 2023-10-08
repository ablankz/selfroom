<?php

namespace App\Http\Controllers\Account;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Http\Controllers\Controller;
use App\Http\Responder\TokenResponder;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class RefreshTokenAction extends Controller
{
  private $authManager;

  public function __construct(AuthManager $authManager)
  {
    $this->authManager = $authManager;
  }

  public function __invoke(Request $request, TokenResponder $responder): JsonResponse
  {
    $guard = $this->authManager->guard('jwt');
    try {
      $token = $guard->refresh();
    } catch (\Throwable $e) {
      throw new ApplicationException(ApplicationCode::RefreshTokenExpired);
    }

    return $responder(
      $token,
      $guard->factory()->getTTL() * 60
    );
  }
}
