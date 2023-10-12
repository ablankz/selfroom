<?php

namespace App\Usecases\User;

use App\Models\Account;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateUserOnProvider extends Usecase
{
  public function run(
    string $provider_id,
    string $provider_name,
    string $nickname,
    string $profile_photo_url = null,
  ) {
    $data = DB::transaction(function () use (
      $provider_id,
      $provider_name,
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
            'provider_id' => $provider_id,
            'provider_name' => $provider_name,
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
