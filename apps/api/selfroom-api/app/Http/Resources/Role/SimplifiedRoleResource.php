<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimplifiedRoleResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'roleId' => $this->role_id,
      'name' => $this->name,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
