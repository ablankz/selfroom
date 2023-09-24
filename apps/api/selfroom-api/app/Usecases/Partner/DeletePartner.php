<?php

namespace App\Usecases\Partner;

use App\Enums\ApplicationCode;
use App\Models\Partner;
use App\Usecases\Usecase;

class DeletePartner extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id
  ) {
    $ret = Partner::where('partner_id', $id)->delete();

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
