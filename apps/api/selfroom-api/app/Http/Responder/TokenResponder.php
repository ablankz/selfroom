<?php

namespace App\Http\Responder;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cookie;

class TokenResponder
{
  public function __invoke($token, int $ttl): JsonResponse
  {
    if (!$token) throw new ApplicationException(ApplicationCode::Unauthenticated);

    return response()->success([
      'accessToken' => $token,
      // 'tokenType' => 'bearer',
      'expiresIn' => $ttl
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
}
