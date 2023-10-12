<?php

namespace App\Usecases\RoomCategory;

use App\Enums\ApplicationCode;
use App\Models\RoomCategory;
use App\Usecases\Usecase;

class FindRoomCategory extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(int $id)
  {
    $ret = RoomCategory::find($id);

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
