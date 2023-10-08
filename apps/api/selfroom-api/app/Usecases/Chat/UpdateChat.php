<?php

namespace App\Usecases\Chat;

use App\Enums\ApplicationCode;
use App\Models\Chat;
use App\Usecases\Usecase;

class UpdateChat extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id,
    string $chat_room_id,
    string $content
  ) {
    $ret = Chat::where('chat_id', $id)
    ->where('chat_room_id', $chat_room_id)
    ->update([
      'content' => $content
    ]);

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
