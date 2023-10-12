<?php

namespace App\Usecases\Chat;

use App\Models\Chat;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetChats extends Usecase
{
  public function run(string $chat_room_id)
  {
    $ret = Chat::with(['user', 'room'])->where('chats.chat_room_id', $chat_room_id)->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
