<?php

namespace App\Providers;

use App\Foundation\Auth\ApplicationUserProvider;
use App\Models\Account;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array<class-string, class-string>
   */
  protected $policies = [
    \App\Models\ChatRoom::class => \App\Policies\ChatRoomPolicy::class,
    \App\Models\Chat::class => \App\Policies\ChatPolicy::class,
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

    foreach(get_all_roles() as $role){
      Gate::define($role->value,function(Account $account) use($role)
      {
        $admin = $account->admin;
        if(!$admin) return false;
        foreach($admin->roles as $ac_role){
          if($ac_role->name === $role->value) {
            return true;
          }
        }
        return false;
      });
    }
  }
}
