<?php

namespace App\Usecases\User;

use App\Models\User;
use App\Usecases\Usecase;

class GetUsers extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
  ) {
    $query = User::query();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch($order){
      case 'name':
        $query = $query->orderBy('nickname', $order_opt);
        break;
      case 'follower':
        $query = $query->orderBy('follower_num', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_users_pkey', $order_opt);
        break;
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
