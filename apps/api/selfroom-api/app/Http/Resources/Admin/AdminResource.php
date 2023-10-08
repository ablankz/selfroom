<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Role\SimplifiedRoleResourceCollection;
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
    $roles = $this->roles;
    $myAdmin = $this->myAdmin;
    return [
      'adminId' => $this->admin_id,
      'nickname' => $this->nickname,
      'profilePhotoUrl' => $this->profile_photo_url,
      'permissions' => $roles ? new SimplifiedRoleResourceCollection($roles) : [],
      'createdBy' => $myAdmin ? new SimplifiedAdminResource($myAdmin) : null,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
