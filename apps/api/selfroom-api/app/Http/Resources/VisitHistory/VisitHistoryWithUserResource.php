<?php

namespace App\Http\Resources\VisitHistory;

use App\Http\Resources\User\SimplifiedUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitHistoryWithUserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $user = $this->user;

    return [
      'user' => $user ? new SimplifiedUserResource($user) : null,
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
