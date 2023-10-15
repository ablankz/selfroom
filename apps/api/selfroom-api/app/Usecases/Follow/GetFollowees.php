<?php

namespace App\Usecases\Follow;

use App\Models\User;
use App\Usecases\Usecase;

class GetFollowees extends Usecase
{
  public function run(
    string $user_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt
  )
  {
    $authFollowers = request()->user()?->user_id ? User::find(request()->user()->user_id)->followees->pluck('user_id')->toArray() : [];

    $query = User::find($user_id)->followees();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
        $query = $query->orderBy('nickname', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_users_pkey', $order_opt);
        break;
    }

    $ret = $query->limit($limit)->offset($offset)->get()->map(function ($user) use ($authFollowers) {
      $user->is_follow = in_array($user->user_id, $authFollowers);
      return $user;
    });

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
