<?php

namespace App\Usecases\User;

use App\Enums\ApplicationCode;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class DeleteUser extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $id
  ) {
    $ret = DB::transaction(function() use($id) {
      $user = User::with(['followers', 'followees', 'favoriteRooms', 'currentRoom'])->where('user_id', $id)->first();
      $user->followers->each(function($follower){
        $follower->update([
          'followees' => $follower->followees - 1
        ]);
      });
      $user->followees->each(function($followee){
        $followee->update([
          'followers' => $followee->followers - 1
        ]);
      });
      $user->favoriteRooms->each(function($room){
        $room->update([
          'favor_num' => $room->favor_num - 1
        ]);
      });
      $user->currentRoom?->update([
        'user_num' => $user->currentRoom->user_num - 1
      ]);
      return $user->delete();
    });

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
