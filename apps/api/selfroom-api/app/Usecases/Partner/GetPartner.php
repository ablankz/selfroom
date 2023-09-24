<?php

namespace App\Usecases\Partner;

use App\Enums\ApplicationCode;
use App\Models\Partner;
use App\Usecases\Usecase;

class GetPartner extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(int $id)
  {
    $ret = Partner::find($id);

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
