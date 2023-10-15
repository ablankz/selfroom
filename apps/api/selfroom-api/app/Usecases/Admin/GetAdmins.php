<?php

namespace App\Usecases\Admin;

use App\Models\Admin;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetAdmins extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt
  )
  {
    $ret = Admin::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
