<?php

namespace App\Http\Middleware;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminGuard
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, string ...$guards): Response
  {
    $guards = empty($guards) ? [null] : $guards;

    foreach ($guards as $guard) {
      if (Auth::guard($guard)->user()->user_id) {
        throw new ApplicationException(ApplicationCode::Permission);
      }
    }

    return $next($request);
  }
}