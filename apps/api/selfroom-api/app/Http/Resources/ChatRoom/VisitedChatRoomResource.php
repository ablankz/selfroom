<?php

namespace App\Http\Resources\ChatRoom;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitedChatRoomResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'chatRoomId' => $this->chat_room_id,
      'name' => $this->name,
      'userNum' => $this->user_num,
      'favorNum' => $this->favor_num,
      'coverPhotoUrl' => $this->cover_photo_url,
      'hasKey' => !is_null($this->room_key),
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
      'visitedAt' => $this->history->visited_at,
      'leftAt' => $this->history->left_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
