<?php

namespace App\Usecases\Role;

use App\Enums\ApplicationCode;
use App\Models\Role;
use App\Usecases\Usecase;

class FindRole extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(int $id)
  {
    $ret = Role::find($id);

    if (is_null($ret)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
