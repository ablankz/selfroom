<?php

namespace App\Usecases\Favorite;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationInternalException;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class Favorite extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;
  public const ALREADY_EXIST = ApplicationCode::ModelConflict;

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
        $ret = $user->favoriteRooms()->syncWithoutDetaching([$chat_room->chat_room_id => [
          'added_at' => now()
        ]]);
        if (empty($ret['attached'])) throw new ApplicationInternalException;
        $chat_room->favor_num++;
        $chat_room->save();
        $user->favorite_room_num++;
        $user->save();
        return 1;
      } catch (\Throwable $e) {
        DB::rollBack();
        if($e instanceof ApplicationInternalException) return 0;
        throw $e;
      }
    });

    if (!$data)
      return [
        'code' => self::ALREADY_EXIST
      ];

    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
