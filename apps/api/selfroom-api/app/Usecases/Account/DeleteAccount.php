<?php

namespace App\Usecases\Account;

use App\Enums\ApplicationCode;
use App\Models\Account;
use App\Usecases\Usecase;

class DeleteAccount extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id
  ) {
    $ret = Account::where('account_id', $id)->delete();

    if (!$ret) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
