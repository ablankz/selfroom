<?php

namespace App\Usecases\Shop;

use App\Models\Shop;
use App\Usecases\Usecase;

class GetAllShops extends Usecase
{
  public function run()
  {
    $ret = Shop::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
