<?php

namespace App\Usecases\Favorite;

use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;

class GetFavors extends Usecase
{
  public function run(
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  )
  {
    $authFavorites = request()->user()?->user_id ? User::find(request()->user()->user_id)->favoriteRooms->pluck('chat_room_id')->toArray() : [];

    $query = ChatRoom::find($chat_room_id)->likedUsers();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
        $query = $query->orderBy('name', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_chat_rooms_pkey', $order_opt);
        break;
    }

    $data = [];

    if ($with_total_count) {
      $dataQuery = clone $query;
      $count = $dataQuery->count();
      $data = [
        ...$data,
        'total_count' => $count
      ];
    }

    $ret = $query->limit($limit)->offset($offset)->get()->map(function ($room) use ($authFavorites) {
      $room->is_favorite = in_array($room->chat_room_id, $authFavorites);
      return $room;
    });

    return [
      'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
      'code' => self::SUCCESS
    ];
  }
}
