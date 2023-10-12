<?php

namespace App\Usecases\ChatRoom;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Usecases\Usecase;

class FindChatRoom extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $ret = ChatRoom::find($id);

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
