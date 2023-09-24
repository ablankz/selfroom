<?php

namespace App\Http\Controllers\Account;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Http\Controllers\Controller;
use App\Http\Responder\TokenResponder;
use App\Usecases\Account\CreateAccountOnProvider;
use App\Usecases\Account\GetAccountOnProvider;
use Exception;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;

class OAuthHandleCallbackAction extends Controller
{
  private $authManager;
  private $getter;
  private $creater;

  public function __construct(AuthManager $authManager, GetAccountOnProvider $getter, CreateAccountOnProvider $creater)
  {
    $this->authManager = $authManager;
    $this->getter = $getter;
    $this->creater = $creater;
  }
  /**
   * Handle the incoming request.
   *
   * @param  string  $provider
   */
  public function __invoke(TokenResponder $responder, string $provider): JsonResponse
  {
    try {
      $socialUser = Socialite::driver($provider)->stateless()->user();
    } catch (Exception) {
      throw new ApplicationException(ApplicationCode::SocialLoginError);
    }

    $providerId = $socialUser->getId();

    try {
      $user = $this->getter->handle($providerId, $provider);
    } catch (ApplicationException) {
      $user = $this->creater->handle($providerId, $provider);
    }

    $guard = $this->authManager->guard('jwt');
    $token = $guard->login($user);

    // トークンの発行
    return $responder(
      $token,
      $guard->factory()->getTTL() * 60
    );
  }
}
