<?php

namespace App\Usecases\ChatRoom;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class DeleteChatRoom extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id
  ) {
    $ret = DB::transaction(function() use($id) {
      $chatRoom = ChatRoom::with(['likedUsers'])->where('chat_room_id', $id)->first();
      $chatRoom->likedUsers->each(function($user){
        $user->update([
          'favorite_room_num' => $user->favorite_room_num - 1
        ]);
      });
      return $chatRoom->delete();
    });

    if (!$ret) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
