<?php

namespace App\Usecases\RoomVisit;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class RoomOut extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;
  public const ALREADY_NOT_EXIST = ApplicationCode::AlreadyNotExist;

  public function run(string $user_id)
  {
    $user = User::find($user_id);

    if (is_null($user)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    if (is_null($user->current_chat_room_id)) {
      return [
        'code' => self::ALREADY_NOT_EXIST
      ];
    }

    DB::transaction(function () use ($user) {
      try {
        $current_chat_room = ChatRoom::find($user->current_chat_room_id);
        if (!is_null($current_chat_room)) {
          $user->latestVisit()->updateExistingPivot($user->current_chat_room_id, [
            'left_at' => now()
          ]);
          DB::table('t_chat_rooms')->where('chat_room_id', $current_chat_room->chat_room_id)->update([
            'user_num' => $current_chat_room->user_num - 1
          ]);
        }
        $user->current_chat_room_id = null;
        $user->save();
      } catch (\Throwable $e) {
        DB::rollBack();
        throw $e;
      }
    });

    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
