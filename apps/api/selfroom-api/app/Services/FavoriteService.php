<?php

namespace App\Services;

use App\Http\Resources\ChatRoom\ChatRoomCardResourceCollection;
use App\Http\Resources\WithResourceCollection;
use App\Usecases\Favorite\Favorite;
use App\Usecases\Favorite\FavoriteCancel;
use App\Usecases\Favorite\GetFavors;

class FavoriteService
{
  public function getFavors(
    GetFavors $usecase,
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($chat_room_id, $limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, ChatRoomCardResourceCollection::class);
    }
    return new ChatRoomCardResourceCollection($data);
  }

  public function add(Favorite $usecase, string $user_id, string $chat_room_id)
  {
    return $usecase->handle($user_id, $chat_room_id);
  }

  public function cancel(FavoriteCancel $usecase, string $user_id, string $chat_room_id)
  {
    return $usecase->handle($user_id, $chat_room_id);
  }
}
