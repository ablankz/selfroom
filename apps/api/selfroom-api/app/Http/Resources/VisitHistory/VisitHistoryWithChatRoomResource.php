<?php

namespace App\Http\Resources\VisitHistory;

use App\Http\Resources\ChatRoom\SimplifiedChatRoomResource;
use App\Http\Resources\User\SimplifiedUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitHistoryWithChatRoomResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $chat_room = $this->chat_room;

    return [
      'userId' => $this->user_id,
      'chatRoom' => $chat_room ? new SimplifiedChatRoomResource($chat_room) : null,
      'visitedAt' => $this->visited_at,
      'leftAt' => $this->left_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
