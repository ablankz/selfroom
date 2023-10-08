<?php

namespace App\Providers;

use App\Foundation\Auth\ApplicationUserProvider;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array<class-string, class-string>
   */
  protected $policies = [
    // 'App\Models\Model' => 'App\Policies\ModelPolicy',
  ];

  /**
   * Register any authentication / authorization services.
   */
  public function boot(): void
  {
    $this->registerPolicies();

    $this->app->make('auth')->provider(
      'app',
      function (Application $app, array $config) {
        return new ApplicationUserProvider(
          $app->make('hash'),
          $config['model']
        );
      }
    );
  }
}
