<?php

namespace App\Http\Resources\ChatRoom;

use App\Http\Resources\RoomCategory\SimplifiedRoomCategoryResourceCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomCardResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $categories = $this->categories;
    return [
      'chatRoomId' => $this->chat_room_id,
      'name' => $this->name,
      'userNum' => $this->user_num,
      'favorNum' => $this->favor_num,
      'coverPhotoUrl' => $this->cover_photo_url,
      'categories' => $categories ? new SimplifiedRoomCategoryResourceCollection($categories) : [],
      'isFavorite' => $this->is_favorite,
      'hasKey' => !is_null($this->room_key),
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
