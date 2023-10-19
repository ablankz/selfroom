<?php

namespace App\Http\Resources\VisitHistory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitHistoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'userId' => $this->user_id,
      'chatRoomId' => $this->chat_room_id,
      'visitedAt' => $this->visited_at,
      'leftAt' => $this->left_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
