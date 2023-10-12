<?php

namespace App\Usecases\Follow;

use App\Enums\ApplicationCode;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class FollowCancel extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;
  public const ALREADY_NOT_EXIST = ApplicationCode::AlreadyNotExist;

  public function run(string $follower_id, string $followee_id)
  {
    $follower = User::find($follower_id);
    $followee = User::find($followee_id);

    if (is_null($followee) || is_null($follower)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $data = DB::transaction(function () use ($followee, $follower) {
      try {
        if (!($follower->followees()->detach($followee->user_id))) return 0;
        $followee->follower_num--;
        $followee->save();
        $follower->follow_num--;
        $follower->save();
        return 1;
      } catch (\Throwable $e) {
        DB::rollBack();
        throw $e;
      }
    });

    if (!$data)
      return [
        'code' => self::ALREADY_NOT_EXIST
      ];

    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
