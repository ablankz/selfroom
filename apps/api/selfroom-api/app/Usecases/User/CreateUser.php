<?php

namespace App\Usecases\User;

use App\Http\Resources\User\UserResource;
use App\Models\Account;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateUser extends Usecase
{
  public function run(
    string $login_id,
    string $raw_password,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $data = DB::transaction(function () use (
      $login_id,
      $raw_password,
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
        $account = Account::create(
          [
            'login_id' => $login_id,
            'password' => app('hash')->make($raw_password),
            'user_id' => $user->user_id,
          ]
        );

        return $account;
      } catch (\Throwable $e) {
        DB::rollBack();
        throw $e;
      }
    });

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
