<?php

namespace App\Services;

use App\Usecases\Favorite\Favorite;
use App\Usecases\Favorite\FavoriteCancel;

class FavoriteService
{
  public function add(Favorite $usecase, string $user_id, string $chat_room_id)
  {
    return $usecase->handle($user_id, $chat_room_id);
  }

  public function cancel(FavoriteCancel $usecase, string $user_id, string $chat_room_id)
  {
    return $usecase->handle($user_id, $chat_room_id);
  }
}
