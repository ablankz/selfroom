<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RetrieveAction extends Controller
{
  private $authManager;

  public function __construct(AuthManager $authManager)
  {
    $this->authManager = $authManager;
  }

  public function __invoke(Request $request): JsonResponse
  {
    return response()->success($this->authManager->guard('jwt')->user());
  }
}