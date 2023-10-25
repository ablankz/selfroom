<?php

namespace App\Services;

use App\Http\Resources\Chat\ChatResource;
use App\Http\Resources\Chat\ChatResourceCollection;
use App\Http\Resources\WithResourceCollection;
use App\Usecases\Chat\CreateChat;
use App\Usecases\Chat\DeleteChat;
use App\Usecases\Chat\FindChat;
use App\Usecases\Chat\GetChats;
use App\Usecases\Chat\UpdateChat;

class ChatService
{
  public function find(FindChat $usecase, string $chat_id, string $chat_room_id)
  {
    return new ChatResource($usecase->handle($chat_id));
  }

  public function get(
    GetChats $usecase,
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($chat_room_id, $limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, ChatResourceCollection::class);
    }
    return new ChatResourceCollection($data);
  }

  public function create(
    CreateChat $usecase,
    string $chat_room_id,
    string $user_id,
    string $content
  ) {
    return new ChatResource($usecase->handle(
      $chat_room_id,
      $user_id,
      $content
    ));
  }

  public function update(
    UpdateChat $usecase,
    string $chat_id,
    string $content,
    string $chat_room_id
  ) {
    return $usecase->handle(
      $chat_id,
      $chat_room_id,
      $content
    );
  }


  public function delete(DeleteChat $usecase, string $chat_id, string $chat_room_id)
  {
    return $usecase->handle($chat_id, $chat_room_id);
  }
}
