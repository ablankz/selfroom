<?php

namespace App\Usecases\RoomCategory;

use App\Models\RoomCategory;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetRoomCategories extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
  ) {
    $ret = RoomCategory::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
