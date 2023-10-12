<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimplifiedUserResource extends JsonResource
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
      'nickname' => $this->nickname,
      'profilePhotoUrl' => $this->profile_photo_url,
      'followerNum' => $this->follower_num,
      'followNum' => $this->follow_num,
      'favoriteRoomNum' => $this->favorite_room_num,
      'currentChatRoomId' => $this->current_chat_room_id,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
