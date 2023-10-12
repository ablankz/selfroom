<?php

namespace App\Usecases\Chat;

use App\Enums\ApplicationCode;
use App\Models\Chat;
use App\Usecases\Usecase;

class FindChat extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id, string $chat_room_id)
  {
    $ret = Chat::where('chat_room_id', $chat_room_id)->where('chat_id', $id)->first();

    if (is_null($ret)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
