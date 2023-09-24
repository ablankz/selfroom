<?php

namespace App\Usecases\Shop;

use App\Enums\ApplicationCode;
use App\Models\Shop;
use App\Usecases\Usecase;

class DeleteShop extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id
  ) {
    $ret = Shop::where('shop_id', $id)->delete();

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
