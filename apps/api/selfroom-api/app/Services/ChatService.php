<?php

namespace App\Services;

use App\Events\Chat\ChatCreated;
use App\Events\Chat\ChatDeleted;
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
    return new ChatResource($usecase->handle($chat_id, $chat_room_id));
  }

  public function get(
    GetChats $usecase,
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count,
    bool $cursor_pagination
  ) {
    $data = $usecase->handle($chat_room_id, $limit, $offset, $order, $order_opt, $with_total_count, $cursor_pagination);
    if($with_total_count || $cursor_pagination){
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
    $chat = $usecase->handle(
      $chat_room_id,
      $user_id,
      $content
    );

    $resource = new ChatResource($chat);

    broadcast(new ChatCreated($resource))->toOthers();

    return new ChatResource($chat);
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
    $ret = $usecase->handle($chat_id, $chat_room_id);
    broadcast(new ChatDeleted($chat_room_id, $chat_id))->toOthers();

    return $ret;
  }
}
