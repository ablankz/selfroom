<?php

namespace App\Http\Controllers\Account;

use App\Exceptions\ApplicationException;
use App\Http\Controllers\Controller;
use App\Usecases\Account\GetAccountOnProvider;
use App\Usecases\User\CreateUserOnProvider;
use Exception;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cookie;
use Laravel\Socialite\Facades\Socialite;

class OAuthHandleCallbackAction extends Controller
{
  private $authManager;
  private $getter;
  private $creater;

  public function __construct(AuthManager $authManager, GetAccountOnProvider $getter, CreateUserOnProvider $creater)
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
  public function __invoke(string $provider): JsonResponse | \Illuminate\Routing\Redirector| \Illuminate\Http\RedirectResponse
  {
    try {
      $socialUser = Socialite::driver($provider)->stateless()->user();
    } catch (Exception) {
      // throw new ApplicationException(ApplicationCode::SocialLoginError);
      return redirect(config('app.frontend_url') . '/oauth-callback?state=error');
    }

    try {
      $providerId = $socialUser->getId();

      try {
        $user = $this->getter->handle($providerId, $provider);
      } catch (ApplicationException) {
        // ユーザーが作成されていない場合
        $nickname = (($socialUser->getNickname() ?? $socialUser->getName()) ?? 'unknown');
        $profile_photo_path = $socialUser->getAvatar() ?? null;
        $user = $this->creater->handle($providerId, $provider, $nickname, $profile_photo_path);
      }

      $guard = $this->authManager->guard('jwt');
      $token = $guard->login($user);

      return redirect(config('app.frontend_url') . '/oauth-callback?state=success')
        ->cookie(Cookie::make(
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

      // トークンの発行
      //   return $responder(
      //     $token,
      //     $guard->factory()->getTTL() * 60
      //   );
      // }
    } catch (\Throwable) {
      return redirect(config('app.frontend_url') . '/oauth-callback?state=system-error');
    }
  }
}
