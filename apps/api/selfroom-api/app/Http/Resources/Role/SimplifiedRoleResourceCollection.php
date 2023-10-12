<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SimplifiedRoleResourceCollection extends ResourceCollection
{
  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    return $this->resource->map(function ($value) {
      return new SimplifiedRoleResource($value);
    })->all();
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
