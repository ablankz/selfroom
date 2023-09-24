<?php

namespace App\Usecases\Account;

use App\Models\Account;
use App\Usecases\Usecase;

class CreateAccount extends Usecase
{
  public function run(
    string $login_id,
    string $password,
    bool $is_active = true
  ) {
    $data = Account::create([
      'login_id' => $login_id,
      'password' => $password,
      'is_active' => $is_active,
    ]);

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
