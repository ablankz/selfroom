<?php

namespace App\Http\Resources\RoomCategory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimplifiedRoomCategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'roomCategoryId' => $this->room_category_id,
      'name' => $this->name,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
