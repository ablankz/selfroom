<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Usecases\User\FindUser;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RetrieveAction extends Controller
{
  private $authManager;
  private $userFind;
  private $adminFind;

  public function __construct(AuthManager $authManager, FindUser $userFind)
  {
    $this->authManager = $authManager;
    $this->userFind = $userFind;
  }

  public function __invoke(Request $request): JsonResponse
  {
    $user = $this->authManager->guard('jwt')->user();
    if($user->admin_id){
      return response()->success($this->adminFind->handle($user->admin_id));
    }else{
      return response()->success($this->userFind->handle($user->user_id));
    }
  }
}