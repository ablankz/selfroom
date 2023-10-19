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
    $admin = Admin::find($id);
    $ret = $admin->delete();

    if (!$ret) {
      return [
        'code' => self::NOT_FOUND
      ];
    }
    return [
      'data' => [
        'data' => [],
        'options' => [
          'profile_photo' => $admin->profile_photo_url
        ]
      ],
      'code' => self::SUCCESS
    ];
  }
}
