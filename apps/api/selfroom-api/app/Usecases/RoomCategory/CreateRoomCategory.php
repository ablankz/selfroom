<?php

namespace App\Usecases\RoomCategory;

use App\Models\RoomCategory;
use App\Usecases\Usecase;

class CreateRoomCategory extends Usecase
{
  public function run(
    string $name
  ) {
    $data = RoomCategory::create(
      [
        'name' => $name,
      ]
    );
    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
