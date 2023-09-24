<?php

namespace App\Usecases\Client;

use App\Enums\ApplicationCode;
use App\Models\Client;
use App\Usecases\Usecase;

class GetClient extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(int $id)
  {
    $ret = Client::find($id);

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
