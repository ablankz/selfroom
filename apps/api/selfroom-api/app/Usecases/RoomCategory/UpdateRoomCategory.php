<?php

namespace App\Usecases\RoomCategory;

use App\Enums\ApplicationCode;
use App\Models\RoomCategory;
use App\Usecases\Usecase;

class UpdateRoomCategory extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    int $id,
    string $name
  ) {
    $ret = RoomCategory::where('room_category_id', $id)->update([
      'name' => $name,
    ]);

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
