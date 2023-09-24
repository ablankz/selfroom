<?php

namespace App\Usecases\Account;

use App\Models\Account;
use App\Usecases\Usecase;

class CreateAccountOnProvider extends Usecase
{
  public function run(
    string $provider_id,
    string $provider_name,
    bool $is_active = true
  ) {
    $data = Account::create([
      'provider_id' => $provider_id,
      'provider_name' => $provider_name,
      'is_active' => $is_active,
    ]);

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
