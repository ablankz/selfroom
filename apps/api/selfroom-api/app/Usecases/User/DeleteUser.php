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
    $user = User::with(['followers', 'followees', 'favoriteRooms', 'currentRoom'])->where('user_id', $id)->first();
    $ret = DB::transaction(function() use($user) {   
      $user->followers->each(function($follower){
        $follower->update([
          'follow_num' => $follower->follow_num - 1
        ]);
      });
      $user->followees->each(function($followee){
        $followee->update([
          'follower_num' => $followee->follower_num - 1
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
      'data' => [
        'data' => [],
        'options' => [
          'profile_photo' => $user->profile_photo_url
        ]
      ],
      'code' => self::SUCCESS
    ];
  }
}
