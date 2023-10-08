<?php

namespace App\Http\Resources\User;

use App\Http\Resources\ChatRoom\SimplifiedChatRoomResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $currentRoom = $this->currentRoom;
    return [
      'userId' => $this->user_id,
      'nickname' => $this->nickname,
      'profilePhotoUrl' => $this->profile_photo_url,
      'followerNum' => $this->follower_num,
      'followNum' => $this->follow_num,
      'favoriteRoomNum' => $this->favorite_room_num,
      'currentChatRoom' => $currentRoom ? new SimplifiedChatRoomResource($currentRoom) : null,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
