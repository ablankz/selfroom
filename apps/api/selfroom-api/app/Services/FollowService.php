<?php

namespace App\Services;

use App\Usecases\Follow\Follow;
use App\Usecases\Follow\FollowCancel;

class FollowService
{
  public function add(Follow $usecase, string $follower_id, string $followee_id)
  {
    return $usecase->handle($follower_id, $followee_id);
  }

  public function cancel(FollowCancel $usecase, string $follower_id, string $followee_id)
  {
    return $usecase->handle($follower_id, $followee_id);
  }
}
