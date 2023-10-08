<?php

namespace App\Usecases\RoomCategory;

use App\Enums\ApplicationCode;
use App\Models\RoomCategory;
use App\Usecases\Usecase;

class DeleteRoomCategory extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id
  ) {
    $ret = RoomCategory::where('room_category_id', $id)->delete();

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
