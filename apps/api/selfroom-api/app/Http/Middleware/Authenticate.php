<?php

namespace App\Http\Middleware;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

        /**
     * Handle an unauthenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function unauthenticated($request, array $guards)
    {
        if($request->is('api/auth/logout')){
          // ログアウトの場合のみrefreshトークンを要求しないようにするため
          throw new ApplicationException(ApplicationCode::AlreadyLogout);  
        }
        throw new ApplicationException(ApplicationCode::Unauthorized);
    }
}
