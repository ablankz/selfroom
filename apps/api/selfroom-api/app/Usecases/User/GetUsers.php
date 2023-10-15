<?php

namespace App\Usecases\User;

use App\Http\Resources\User\SimplifiedUserResourceCollection;
use App\Models\User;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetUsers extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
  ) {
    $ret = User::all();

    return [
      'data' => new SimplifiedUserResourceCollection($ret),
      'code' => self::SUCCESS
    ];
  }
}
