<?php

namespace App\Usecases\User;

use App\Enums\ApplicationCode;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Usecases\Usecase;

class FindUser extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $ret = User::find($id);

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
