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
    $chatRoom = ChatRoom::with(['likedUsers'])->where('chat_room_id', $id)->first();
    $ret = DB::transaction(function() use($chatRoom) {
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
      'data' => [
        'data' => [],
        'options' => [
          'cover_photo' => $chatRoom->cover_photo_url
        ]
      ],
      'code' => self::SUCCESS
    ];
  }
}
