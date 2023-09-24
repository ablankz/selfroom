<?php

namespace App\Http\Responder;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use Illuminate\Http\JsonResponse;

class TokenResponder
{
  public function __invoke($token, int $ttl): JsonResponse
  {
    if (!$token) throw new ApplicationException(ApplicationCode::Unauthenticated);

    return response()->success([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => $ttl
    ]);
  }
}
