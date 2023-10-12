<?php

namespace App\Usecases\Favorite;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class FavoriteCancel extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;
  public const ALREADY_NOT_EXIST = ApplicationCode::AlreadyNotExist;

  public function run(string $user_id, string $chat_room_id)
  {
    $user = User::find($user_id);
    $chat_room = ChatRoom::find($chat_room_id);

    if (is_null($user) || is_null($chat_room)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $data = DB::transaction(function () use ($user, $chat_room) {
      try {
        if (!($user->favoriteRooms()->detach($chat_room->chat_room_id))) return 0;
        $chat_room->favor_num--;
        $chat_room->save();
        $user->favorite_room_num--;
        $user->save();
        return 1;
      } catch (\Throwable $e) {
        DB::rollBack();
        throw $e;
      }
    });

    if (!$data)
      return [
        'code' => self::ALREADY_NOT_EXIST
      ];

    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
