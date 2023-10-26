<?php

namespace App\Usecases\ChatRoom;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;

class FindChatRoom extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $authFavorites = request()->user()?->user_id ? User::find(request()->user()->user_id)->favoriteRooms->pluck('chat_room_id')->toArray() : [];

    $ret = ChatRoom::find($id);

    if (is_null($ret)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $ret->is_favorite = in_array($ret->chat_room_id, $authFavorites);

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
