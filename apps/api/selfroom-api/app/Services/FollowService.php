<?php

namespace App\Services;

use App\Http\Resources\User\UserCardResourceCollection;
use App\Usecases\Follow\Follow;
use App\Usecases\Follow\FollowCancel;
use App\Usecases\Follow\GetFollowees;
use App\Usecases\Follow\GetFollowers;

class FollowService
{
  public function getFollowers(GetFollowers $usecase, string $user_id)
  {
    return new UserCardResourceCollection($usecase->handle($user_id));
  }

  public function getFollowees(GetFollowees $usecase, string $user_id)
  {
    return new UserCardResourceCollection($usecase->handle($user_id));
  }

  public function add(Follow $usecase, string $follower_id, string $followee_id)
  {
    return $usecase->handle($follower_id, $followee_id);
  }

  public function cancel(FollowCancel $usecase, string $follower_id, string $followee_id)
  {
    return $usecase->handle($follower_id, $followee_id);
  }
}
