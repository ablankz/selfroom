<?php

namespace App\Services;

use App\Usecases\User\CreateUser;
use App\Usecases\User\DeleteUser;
use App\Usecases\User\FindUser;
use App\Usecases\User\GetUsers;
use App\Usecases\User\UpdateUser;

class UserService
{
  public function find(FindUser $usecase, string $userId)
  {
    return $usecase->handle($userId);
  }

  public function get(GetUsers $usecase)
  {
    return $usecase->handle();
  }

  public function create(
    CreateUser $usecase, 
    string $login_id,
    string $raw_passsword,
    string $nickname,
    string $profile_photo_url,
  ){
    return $usecase->handle(
      $login_id,
      $raw_passsword,
      $nickname,
      $profile_photo_url
    );
  }

  public function update(
    UpdateUser $usecase,
    string $userId,
    string $nickname,
    string $profile_photo_url
  ) {
    return $usecase->handle(
      $userId,
      $nickname,
      $profile_photo_url
    );
  }

  public function delete(DeleteUser $usecase, string $userId)
  {
    return $usecase->handle($userId);
  }
}
