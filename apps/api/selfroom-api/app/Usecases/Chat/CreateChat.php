<?php

namespace App\Usecases\Chat;

use App\Models\Chat;
use App\Models\ChatRoom;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateChat extends Usecase
{
  public function run(
    string $chat_room_id,
    string $user_id,
    string $content
  ) {
    $data = DB::transaction(function () use ($chat_room_id, $user_id, $content) {
      try {
        $data = Chat::create(
          [
            'chat_room_id' => $chat_room_id,
            'user_id' => $user_id,
            'content' => $content
          ]
        );
        ChatRoom::where('chat_room_id', $chat_room_id)->update([
          'updated_at' => now()
        ]);
        return $data;
      } catch (\Throwable) {
        DB::rollBack();
      }
    });
    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
