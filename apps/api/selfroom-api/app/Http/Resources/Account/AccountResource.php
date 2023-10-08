<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\Admin\AdminResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $user = $this->user;
    $admin = $this->admin;
    return [
      'accountId' => $this->account_id,
      'user' => $user ? new UserResource($user) : null,
      'admin' => $admin ? new AdminResource($admin) : null,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }
}
