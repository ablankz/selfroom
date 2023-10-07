<?php

namespace App\Providers;

use App\Constants\ThrottleSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationAttributeException;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
  /**
   * The path to your application's "home" route.
   *
   * Typically, users are redirected here after authentication.
   *
   * @var string
   */
  public const HOME = '/dashboard';

  /**
   * Define your route model bindings, pattern filters, and other route configuration.
   */
  public function boot(): void
  {
    RateLimiter::for('api', function (Request $request) {
      return Limit::perMinutes(ThrottleSettings::WHOLE_DECAY_MINUTES, ThrottleSettings::WHOLE_MAX_ATTEMPTS)
        ->response(function ($req, $headers) {
          $errors = [
            'decaySeconds' => ThrottleSettings::WHOLE_DECAY_MINUTES * 60,
            'waitSeconds' => $headers["Retry-After"],
            'maxAttempts' => ThrottleSettings::WHOLE_MAX_ATTEMPTS,
          ];
          throw new ApplicationAttributeException(ApplicationCode::ThrottleRequests, $errors, null, $headers);
        })
        ->by($request->user()?->id ?: $request->ip());
    });

    Route::pattern('id', '[0-9]+');
    Route::pattern('uuid', '([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})');
    Route::pattern('ulid', '[0-9a-hjkmnp-zA-HJKMNP-Z]{26}');

    $this->routes(function () {
      Route::middleware('api')
        ->prefix('api')
        ->group(base_path('routes/api.php'));

      Route::middleware('web')
        ->prefix('web')
        ->group(base_path('routes/web.php'));
    });
  }
}
