<?php

namespace App\Usecases\Client;

use App\Enums\ApplicationCode;
use App\Models\Client;
use App\Usecases\Usecase;

class DeleteClient extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id
  ) {
    $ret = Client::where('client_id', $id)->delete();

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
