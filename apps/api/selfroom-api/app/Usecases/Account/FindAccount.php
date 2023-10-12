<?php

namespace App\Usecases\Account;

use App\Enums\ApplicationCode;
use App\Models\Account;
use App\Usecases\Usecase;

class FindAccount extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $ret = Account::find($id);

    if (is_null($ret)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
