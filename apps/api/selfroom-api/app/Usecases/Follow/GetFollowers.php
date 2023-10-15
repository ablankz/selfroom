<?php

namespace App\Usecases\Follow;

use App\Models\User;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetFollowers extends Usecase
{
  public function run(
    string $user_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt
  )
  {
    $authFollowers = request()->user()?->user_id ? User::find(request()->user()?->user_id)->followees->pluck('user_id')->toArray() : [];

    $ret = User::find($user_id)->followers->map(function ($user) use ($authFollowers) {
      $user->is_follow = in_array($user->user_id, $authFollowers);
      return $user;
    });

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
