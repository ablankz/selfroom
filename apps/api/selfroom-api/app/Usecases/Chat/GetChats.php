<?php

namespace App\Usecases\Chat;

use App\Models\Chat;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetChats extends Usecase
{
  public function run()
  {
    $ret = Chat::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
