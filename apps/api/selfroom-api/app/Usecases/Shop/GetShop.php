<?php

namespace App\Usecases\Shop;

use App\Enums\ApplicationCode;
use App\Models\Shop;
use App\Usecases\Usecase;

class GetShop extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(int $id)
  {
    $ret = Shop::find($id);

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
