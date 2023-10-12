<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChatResourceCollection extends ResourceCollection
{
  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    return $this->resource->map(function ($value) {
      return new ChatResource($value);
    })->all();
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
