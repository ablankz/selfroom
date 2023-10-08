<?php

namespace App\Usecases\Admin;

use App\Enums\ApplicationCode;
use App\Models\Admin;
use App\Usecases\Usecase;

class FindAdmin extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $ret = Admin::find($id);

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
