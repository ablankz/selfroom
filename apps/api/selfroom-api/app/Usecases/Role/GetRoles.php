<?php

namespace App\Usecases\Role;

use App\Models\Role;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetRoles extends Usecase
{
  public function run()
  {
    $ret = Role::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
