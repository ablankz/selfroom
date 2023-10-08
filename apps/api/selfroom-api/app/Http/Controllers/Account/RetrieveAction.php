<?php

namespace App\Http\Controllers\Account;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Http\Resources\UserResource;
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
    $user = $this->authManager->guard('jwt')->user();
    if ($user->admin_id) {
      if (!$user->admin) throw new ApplicationException(ApplicationCode::AuthNotFound);
      return response()->success(new AdminResource($user->admin));
    } else {
      if (!$user->user) throw new ApplicationException(ApplicationCode::AuthNotFound);
      return response()->success(new UserResource($user->user));
    }
  }
}
