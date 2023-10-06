<?php

namespace App\Usecases\User;

use App\Models\Account;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateUser extends Usecase
{
  public function run(
    string $login_id,
    string $raw_passsword,
    string $nickname,
    string $profile_photo_url,
  ) {
    $data = DB::transaction(function () use (
      $login_id,
      $raw_passsword,
      $nickname,
      $profile_photo_url,
    ) {
      try {
        $user = User::create(
          [
            'nickname' => $nickname,
            'profile_photo_url' => $profile_photo_url
          ]
        );
        return Account::create(
          [
            'login_id' => $login_id,
            'password' => app('hash')->make($raw_passsword),
            'user_id' => $user->user_id,
          ]
        );
      } catch (\Throwable) {
        DB::rollBack();
      }
    });

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
