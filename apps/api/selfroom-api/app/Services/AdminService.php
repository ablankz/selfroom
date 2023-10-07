<?php

namespace App\Services;

use App\Usecases\Admin\CreateAdmin;
use App\Usecases\Admin\DeleteAdmin;
use App\Usecases\Admin\FindAdmin;
use App\Usecases\Admin\GetAdmins;
use App\Usecases\Admin\UpdateAdmin;

class AdminService
{
  public function find(FindAdmin $usecase, string $adminId)
  {
    return $usecase->handle($adminId);
  }

  public function get(GetAdmins $usecase)
  {
    return $usecase->handle();
  }

  public function create(
    CreateAdmin $usecase, 
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
    UpdateAdmin $usecase,
    string $adminId,
    string $nickname,
    string $profile_photo_url
  ) {
    return $usecase->handle(
      $adminId,
      $nickname,
      $profile_photo_url
    );
  }

  public function delete(DeleteAdmin $usecase, string $adminId)
  {
    return $usecase->handle($adminId);
  }
}
