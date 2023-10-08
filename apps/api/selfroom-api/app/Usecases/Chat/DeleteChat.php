<?php

namespace App\Usecases\Chat;

use App\Enums\ApplicationCode;
use App\Models\Chat;
use App\Usecases\Usecase;

class DeleteChat extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id
  ) {
    $ret = Chat::where('chat_id', $id)->delete();

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
