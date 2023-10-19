<?php

namespace App\Usecases\User;

use App\Enums\ApplicationCode;
use App\Models\User;
use App\Usecases\Usecase;

class FindUser extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(string $id)
  {
    $authFollowers = request()->user()?->user_id ? User::find(request()->user()->user_id)->followees->pluck('user_id')->toArray() : [];

    $ret = User::find($id);

    if (is_null($ret)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $ret->is_follow = in_array($ret->user_id, $authFollowers);

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
