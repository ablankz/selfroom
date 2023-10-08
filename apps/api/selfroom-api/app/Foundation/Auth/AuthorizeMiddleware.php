<?php

namespace App\Foundation\Auth;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use Closure;
use Illuminate\Auth\Middleware\Authorize;
use Illuminate\Database\Eloquent\Model;

class AuthorizeMiddleware extends Authorize
{
  public $resolve = [
    'chatRoomId' => \App\Models\ChatRoom::class
  ];

  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @param  string  $ability
   * @param  array|null  ...$models
   * @return mixed
   *
   * @throws \Illuminate\Auth\AuthenticationException
   * @throws \Illuminate\Auth\Access\AuthorizationException
   */
  public function handle($request, Closure $next, $ability, ...$models)
  {
    $modelInstance = [];
    foreach ($models as $id) {
      $rf = false;
      foreach ($this->resolve as $alias => $model) {
        if ($alias == $id) {
          $modelInstance[] = $this->createModel($model);
          $rf = true;
        }
      }
      if(!$rf) $modelInstance[] = $id;
      else $rf = false;
    }
    if ($this->gate->denies($ability, $this->getGateArguments($request, $modelInstance))) {
      throw new ApplicationException(ApplicationCode::Permission);
    }

    return $next($request);
  }

  public function createModel($modelClass): Model
  {
    $class = '\\' . ltrim($modelClass, '\\');
    return new $class;
  }
}
