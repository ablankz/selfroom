<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimplifiedChatResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'chatId' => $this->chat_id,
      'userId' => $this->user_id,
      'chatRoomId' => $this->chat_room_id,
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
