<?php

namespace App\Usecases\User;

use App\Enums\ApplicationCode;
use App\Models\User;
use App\Usecases\Usecase;

class UpdateUser extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $ret = User::where('user_id', $id)->update([
      'nickname' => $nickname,
      'profile_photo_url' => $profile_photo_url
    ]);

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
