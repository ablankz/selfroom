<?php

namespace App\Services;

use App\Constants\StorageSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationLoggerException;
use App\Http\Resources\ChatRoom\ChatRoomCardResourceCollection;
use App\Http\Resources\ChatRoom\ChatRoomResource;
use App\Http\Resources\WithResourceCollection;
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

  public function get(
    GetChatRooms $usecase,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    string $search_type,
    string $search,
    string $is_lock,
    string $is_favorite,
    array $categories,
    string $category_select_type,
    bool $with_total_count
  ) {
    $data = $usecase->handle(
      $limit,
      $offset,
      $order,
      $order_opt,
      $search_type,
      $search,
      $is_lock,
      $is_favorite,
      $categories,
      $category_select_type,
      $with_total_count
    );
    if ($with_total_count) {
      return new WithResourceCollection($data, ChatRoomCardResourceCollection::class);
    }
    return new ChatRoomCardResourceCollection($data);
  }

  public function create(
    CreateChatRoom $usecase,
    string $name,
    array $categories,
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
      $categories,
      $imgPath,
      $room_key
    ));
  }
}
