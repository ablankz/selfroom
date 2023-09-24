<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;

class OAuthRedirectAction extends Controller
{
  /**
   * Handle the incoming request.
   *
   * @param  string  $provider サービス名
   */
  public function __invoke(string $provider)
  {
    $redirectUrl = Socialite::driver($provider)->stateless()->with(['state' => 'selfroom-api'])->redirect()->getTargetUrl();

    return response()->success([
      'redirect_url' => $redirectUrl,
    ]);
  }
}
