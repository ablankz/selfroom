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
  public const ALREADY_EXIST = ApplicationCode::ModelConflict;

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
        'data' => [],
        'code' => self::SUCCESS
      ];
    }

    DB::transaction(function () use ($user) {
      try {
        $current_chat_room = ChatRoom::find($user->current_chat_room_id);
        if (!is_null($current_chat_room)) {
          $current_chat_room->user_num--;
          $current_chat_room->save();
        }
        $user->current_chat_room_id = null;
        $user->save();
        $user->visitedRooms()->updateExistingPivot($user->current_chat_room_id, [
          'left_at' => now()
        ]);
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
