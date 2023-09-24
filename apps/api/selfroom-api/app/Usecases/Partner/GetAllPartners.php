<?php

namespace App\Usecases\Partner;

use App\Models\Partner;
use App\Usecases\Usecase;

class GetAllPartners extends Usecase
{
  public function run()
  {
    $ret = Partner::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
