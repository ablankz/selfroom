<?php

namespace App\Http\Controllers\Account;

use App\Constants\ThrottleSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Exceptions\ApplicationAttributeException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\LoginRequest;
use App\Http\Responder\TokenResponder;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\InteractsWithTime;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

final class LoginAction extends Controller
{
  use InteractsWithTime;

  private $authManager;

  public function __construct(AuthManager $authManager)
  {
    $this->authManager = $authManager;
  }

  public function __invoke(LoginRequest $request, TokenResponder $responder): JsonResponse
  {
    $guard = $this->authManager->guard('jwt');
    $this->ensureIsNotRateLimited($request);
    $token = $guard->attempt([
      'login_id' => $request->get('loginId'),
      'password' => $request->get('password'),
    ]);
    if (!$token) {
      RateLimiter::hit($this->throttleKey($request), ThrottleSettings::LOGIN_DECAY_SECONDS);
      throw new ApplicationException(ApplicationCode::Unauthenticated);
    }

    RateLimiter::clear($this->throttleKey($request));

    return $responder(
      $token,
      $guard->factory()->getTTL() * 60
    );
  }

  /**
   * Ensure the login request is not rate limited.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function ensureIsNotRateLimited(Request $request): void
  {
    if (!RateLimiter::tooManyAttempts($this->throttleKey($request), ThrottleSettings::LOGIN_MAX_ATTEMPTS)) {
      return;
    }

    $seconds = RateLimiter::availableIn($this->throttleKey($request));

    $errors = [
      'decaySeconds' => ThrottleSettings::LOGIN_DECAY_SECONDS,
      'waitSeconds' => $seconds,
      'maxAttempts' => ThrottleSettings::LOGIN_MAX_ATTEMPTS
    ];
    $headers = $this->getHeaders(
      ThrottleSettings::LOGIN_MAX_ATTEMPTS,
      $this->calculateRemainingAttempts($this->throttleKey($request), ThrottleSettings::LOGIN_MAX_ATTEMPTS, $seconds),
      $seconds
    );
    throw new ApplicationAttributeException(ApplicationCode::ThrottleLoginRequests, $errors, null, $headers);
  }

  /**
     * Calculate the number of remaining attempts.
     *
     * @param  string  $key
     * @param  int  $maxAttempts
     * @param  int|null  $retryAfter
     * @return int
     */
    protected function calculateRemainingAttempts($key, $maxAttempts, $retryAfter = null)
    {
        return is_null($retryAfter) ? RateLimiter::retriesLeft($key, $maxAttempts) : 0;
    }

  /**
   * Get the rate limiting throttle key for the request.
   */
  public function throttleKey(Request $request): string
  {
    return Str::transliterate(Str::lower($request->input('loginId')) . '|' . $request->ip());
  }

  /**
   * Get the limit headers information.
   *
   * @param  int  $maxAttempts
   * @param  int  $remainingAttempts
   * @param  int|null  $retryAfter
   * @param  \Symfony\Component\HttpFoundation\Response|null  $response
   * @return array
   */
  protected function getHeaders(
    $maxAttempts,
    $remainingAttempts,
    $retryAfter = null,
    ?Response $response = null
  ) {
    if (
      $response &&
      !is_null($response->headers->get('X-RateLimit-Remaining')) &&
      (int) $response->headers->get('X-RateLimit-Remaining') <= (int) $remainingAttempts
    ) {
      return [];
    }

    $headers = [
      'X-RateLimit-Limit' => $maxAttempts,
      'X-RateLimit-Remaining' => $remainingAttempts,
    ];

    if (!is_null($retryAfter)) {
      $headers['Retry-After'] = $retryAfter;
      $headers['X-RateLimit-Reset'] = $this->availableAt($retryAfter);
    }

    return $headers;
  }
}
