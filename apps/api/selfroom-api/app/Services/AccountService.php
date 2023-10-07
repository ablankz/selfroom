<?php

namespace App\Services;

use App\Usecases\Account\DeleteAccount;
use App\Usecases\Account\FindAccount;
use App\Usecases\Account\GetAccounts;

class AccountService
{
  public function find(FindAccount $usecase, string $accountId)
  {
    return $usecase->handle($accountId);
  }

  public function get(GetAccounts $usecase)
  {
    return $usecase->handle();
  }

  public function delete(DeleteAccount $usecase, string $accountId)
  {
    return $usecase->handle($accountId);
  }
}
