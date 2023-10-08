<?php

namespace App\Services;

use App\Constants\StorageSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationLoggerException;
use App\Http\Resources\ChatRoom\ChatRoomResource;
use App\Http\Resources\ChatRoom\ChatRoomResourceCollection;
use App\Usecases\ChatRoom\CreateChatRoom;
use App\Usecases\ChatRoom\FindChatRoom;
use App\Usecases\ChatRoom\GetChatRooms;
use Illuminate\Http\UploadedFile;
use Psr\Log\LogLevel;

class ChatRoomService
{
  public function find(FindChatRoom $usecase, string $chat_room_id)
  {
    return new ChatRoomResource($usecase->handle($chat_room_id));
  }

  public function get(GetChatRooms $usecase)
  {
    return new ChatRoomResourceCollection($usecase->handle());
  }

  public function create(
    CreateChatRoom $usecase,
    string $name,
    UploadedFile $cover_photo_url = null,
    string $room_key = null
  ) {
    if ($cover_photo_url) {
      try {
        $imgPath = $cover_photo_url->store(StorageSettings::ROOM_COVER_STORAGE);
      } catch (\Throwable) {
        throw new ApplicationLoggerException(ApplicationCode::FailedUpload, LogLevel::ALERT, "ファイルのアップロードに失敗");
      }
    } else {
      $imgPath = null;
    }

    return new ChatRoomResource($usecase->handle(
      $name,
      $imgPath,
      $room_key
    ));
  }
}
