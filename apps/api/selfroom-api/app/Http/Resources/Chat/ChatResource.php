<?php

namespace App\Http\Resources\Chat;

use App\Http\Resources\ChatRoom\SimplifiedChatRoomResource;
use App\Http\Resources\User\SimplifiedUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $user = $this->user;
    $room = $this->room;
    return [
      'chatId' => $this->chat_id,
      'user' => $user ? new SimplifiedUserResource($user) : null,
      'chatRoom' => $room ? new SimplifiedChatRoomResource($room) : null,
      'content' => $this->content,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
