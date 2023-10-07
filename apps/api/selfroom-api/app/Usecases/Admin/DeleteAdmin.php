<?php

namespace App\Usecases\Admin;

use App\Enums\ApplicationCode;
use App\Models\Admin;
use App\Usecases\Usecase;

class DeleteAdmin extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id
  ) {
    $ret = Admin::where('admin_id', $id)->delete();

    if (!$ret) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
