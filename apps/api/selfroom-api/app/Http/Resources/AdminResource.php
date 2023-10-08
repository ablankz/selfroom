<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'adminId' => $this->admin_id,
      'nickname' => $this->nickname,
      'profilePhotoUrl' => $this->profile_photo_url,
      'permissions' => new RoleResourceCollection($this->roles),
      'createdBy' => $this->myAdmin ? new SimplifiedAdminResource($this->myAdmin) : null,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
