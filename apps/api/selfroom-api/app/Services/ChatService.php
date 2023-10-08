<?php

namespace App\Services;

use App\Http\Resources\Chat\ChatResource;
use App\Http\Resources\Chat\SimplifiedChatResourceCollection;
use App\Usecases\Chat\CreateChat;
use App\Usecases\Chat\DeleteChat;
use App\Usecases\Chat\FindChat;
use App\Usecases\Chat\GetChats;
use App\Usecases\Chat\UpdateChat;

class ChatService
{
  public function find(FindChat $usecase, string $chat_id)
  {
    return new ChatResource($usecase->handle($chat_id));
  }

  public function get(GetChats $usecase)
  {
    return new SimplifiedChatResourceCollection($usecase->handle());
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
    string $content
  ) {
    return $usecase->handle(
      $chat_id,
      $content
    );
  }


  public function delete(DeleteChat $usecase, string $chat_id)
  {
    return $usecase->handle($chat_id);
  }
}
