<?php

namespace App\Usecases\Admin;

use App\Models\Admin;
use App\Usecases\Usecase;

class GetAdmins extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt
  ) {
    $query = Admin::query();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
        $query = $query->orderBy('nickname', $order_opt);
        break;
      case 'permission':
        $query = $query->withCount('roles')->orderBy('roles_count', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_admins_pkey', $order_opt);
        break;
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
