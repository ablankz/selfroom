<?php

namespace App\Usecases\User;

use App\Enums\ApplicationCode;
use App\Models\User;
use App\Usecases\Usecase;

class DeleteUser extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id
  ) {
    $ret = User::where('user_id', $id)->delete();

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
