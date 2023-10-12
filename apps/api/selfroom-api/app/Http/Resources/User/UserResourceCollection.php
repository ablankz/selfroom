<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserResourceCollection extends ResourceCollection
{
  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    return $this->resource->map(function ($value) {
      return new UserResource($value);
    })->all();
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
