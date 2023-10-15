<?php

namespace App\Usecases\Role;

use App\Models\Role;
use App\Usecases\Usecase;

class GetRoles extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
  )
  {
    $query = Role::query();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
      default:
        $query = $query->orderBy('name', $order_opt);
        break;
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
