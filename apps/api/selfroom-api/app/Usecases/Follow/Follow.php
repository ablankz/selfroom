<?php

namespace App\Usecases\Follow;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationInternalException;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class Follow extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;
  public const ALREADY_EXIST = ApplicationCode::ModelConflict;

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
        $ret = $follower->followees()->syncWithoutDetaching([$followee->user_id => [
          'followed_at' => now()
        ]]);
        if (empty($ret['attached'])) throw new ApplicationInternalException;
        $followee->follower_num++;
        $followee->save();
        $follower->follow_num++;
        $follower->save();
        return 1;
      } catch (\Throwable $e) {
        if($e instanceof ApplicationInternalException) return 0;
        throw $e;
      }
    });

    if (!$data)
      return [
        'code' => self::ALREADY_EXIST
      ];

    return [
      'data' => [],
      'code' => self::SUCCESS
    ];
  }
}
