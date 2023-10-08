<?php

namespace App\Foundation\Auth;

use Illuminate\Auth\EloquentUserProvider;

class ApplicationUserProvider extends EloquentUserProvider
{
  /**
   * Retrieve a user by their unique identifier.
   *
   * @param  mixed  $identifier
   * @return \Illuminate\Contracts\Auth\Authenticatable|null
   */
  public function retrieveById($identifier)
  {
    $model = $this->createModel();
    return $this->newModelQuery($model)
    ->with(['user', 'admin.roles', 'admin.myAdmin'])
    ->where($model->getAuthIdentifierName(), $identifier)
    ->first();
  }
}
