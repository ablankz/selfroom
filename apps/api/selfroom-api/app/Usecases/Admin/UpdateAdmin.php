<?php

namespace App\Usecases\Admin;

use App\Enums\ApplicationCode;
use App\Models\Admin;
use App\Usecases\Usecase;

class UpdateAdmin extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $ret = Admin::where('admin_id', $id)->update([
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
