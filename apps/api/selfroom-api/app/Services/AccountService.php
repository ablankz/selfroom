<?php

namespace App\Services;

use App\Http\Resources\Account\AccountResource;
use App\Http\Resources\Account\SimplifiedAccountResourceCollection;
use App\Usecases\Account\DeleteAccount;
use App\Usecases\Account\FindAccount;
use App\Usecases\Account\GetAccounts;

class AccountService
{
  public function find(FindAccount $usecase, string $account_id)
  {
    return new AccountResource($usecase->handle($account_id));
  }

  public function get(GetAccounts $usecase)
  {
    return new SimplifiedAccountResourceCollection($usecase->handle());
  }

  public function delete(DeleteAccount $usecase, string $account_id)
  {
    return $usecase->handle($account_id);
  }
}
