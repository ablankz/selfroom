<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

final class LogoutAction extends Controller
{
  private $authManager;

  public function __construct(AuthManager $authManager)
  {
    $this->authManager = $authManager;
  }

  public function __invoke(Request $request): JsonResponse
  {
    $this->authManager->guard('jwt')->logout();

    return response()->success()
      ->cookie(Cookie::forget(
        'token'
      ));;
  }
}
