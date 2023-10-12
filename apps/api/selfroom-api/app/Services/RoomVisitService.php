<?php

namespace App\Services;

use App\Usecases\RoomVisit\RoomIn;
use App\Usecases\RoomVisit\RoomOut;

class RoomVisitService
{
  public function in(RoomIn $usecase, string $user_id, string $chat_room_id, string $keyword = null)
  {
    return $usecase->handle($user_id, $chat_room_id, $keyword);
  }

  public function out(RoomOut $usecase, string $user_id)
  {
    return $usecase->handle($user_id);
  }
}
