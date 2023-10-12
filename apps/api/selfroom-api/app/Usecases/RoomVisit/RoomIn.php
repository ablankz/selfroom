<?php

namespace App\Usecases\RoomVisit;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class RoomIn extends Usecase
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

    if ($user->current_chat_room_id == $chat_room->chat_room_id) {
      return [
        'code' => self::ALREADY_EXIST
      ];
    }

    DB::transaction(function () use ($user, $chat_room) {
      try {
        if (!is_null($user->current_chat_room_id)) {
          $current_chat_room = ChatRoom::find($user->current_chat_room_id);
          if (!is_null($current_chat_room)) {
            $current_chat_room->user_num--;
            $current_chat_room->save();
          }
          $user->visitedRooms()->updateExistingPivot($user->current_chat_room_id, [
            'left_at' => now()
          ]);
        }
        $chat_room->user_num++;
        $chat_room->save();
        $user->current_chat_room_id = $chat_room->chat_room_id;
        $user->save();
        $user->visitedRooms()->attach($chat_room->chat_room_id, [
          'visited_at' => now()
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