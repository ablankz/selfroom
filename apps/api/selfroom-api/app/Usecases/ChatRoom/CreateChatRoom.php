<?php

namespace App\Usecases\ChatRoom;

use App\Models\ChatRoom;
use App\Usecases\Usecase;

class CreateChatRoom extends Usecase
{
  public function run(
    string $name,
    string $cover_photo_url,
    string $room_key = null
  ) {
    $data = ChatRoom::create(
      [
        'name' => $name,
        'cover_photo_url' => $cover_photo_url,
        'room_key' => $room_key ? app('hash')->make($room_key) : null,
      ]
    );
    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
