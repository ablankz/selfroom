<?php

namespace App\Usecases\Follow;

use App\Models\User;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetFollowees extends Usecase
{
  public function run(string $user_id)
  {
    $authFollowers = request()->user()?->user_id ? User::find(request()->user()?->user_id)->followees->pluck('user_id')->toArray() : [];

    $ret = User::find($user_id)->followees->map(function ($user) use ($authFollowers) {
      $user->is_follow = in_array($user->user_id, $authFollowers);
      return $user;
    });

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
