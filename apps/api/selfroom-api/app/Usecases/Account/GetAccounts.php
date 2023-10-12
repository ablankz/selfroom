<?php

namespace App\Usecases\Account;

use App\Models\Account;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetAccounts extends Usecase
{
  public function run()
  {
    $ret = Account::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
