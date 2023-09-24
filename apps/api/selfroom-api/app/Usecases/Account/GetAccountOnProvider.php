<?php

namespace App\Usecases\Account;

use App\Enums\ApplicationCode;
use App\Models\Account;
use App\Usecases\Usecase;

class GetAccountOnProvider extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $provider_id,
    string $provider_name,
  ) {
    $data = Account::where('provider_id', $provider_id)->where('provider_name', $provider_name)->first();

    if (is_null($data)) 
      return [
        'code' => self::NOT_FOUND
      ];

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
