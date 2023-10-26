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
    bool $with_total_count
  ) {
    $query = User::query();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
        $query = $query->orderBy('nickname', $order_opt);
        break;
      case 'follower':
        $query = $query->orderBy('follower_num', $order_opt)->orderBy('nickname', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_users_pkey', $order_opt);
        break;
    }

    $data = [];

    if ($with_total_count) {
      $dataQuery = clone $query;
      $count = $dataQuery->count();
      $data = [
        ...$data,
        'total_count' => $count
      ];
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
      'code' => self::SUCCESS
    ];
  }
}
