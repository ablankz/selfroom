<?php

namespace App\Http\Resources\ChatRoom;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SimplifiedChatRoomResourceCollection extends ResourceCollection
{
  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    return $this->resource->map(function ($value) {
      return new SimplifiedChatRoomResource($value);
    })->all();
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
