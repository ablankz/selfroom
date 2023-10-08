<?php

namespace App\Services;

use App\Constants\StorageSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationLoggerException;
use App\Usecases\Admin\CreateAdmin;
use App\Usecases\Admin\DeleteAdmin;
use App\Usecases\Admin\FindAdmin;
use App\Usecases\Admin\GetAdmins;
use App\Usecases\Admin\UpdateAdmin;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Psr\Log\LogLevel;

class AdminService
{
  public function find(FindAdmin $usecase, string $admin_id)
  {
    return $usecase->handle($admin_id);
  }

  public function get(GetAdmins $usecase)
  {
    return $usecase->handle();
  }

  public function create(
    CreateAdmin $usecase,
    string $created_by,
    string $login_id,
    string $raw_passsword,
    string $nickname,
    UploadedFile | null $profile_photo_url,
  ) {
    if ($profile_photo_url) {
      try {
        $imgPath = $profile_photo_url->store(StorageSettings::ADMIN_PROFILE_STORAGE);
      } catch (\Throwable) {
        throw new ApplicationLoggerException(ApplicationCode::FailedUpload, LogLevel::ALERT, "ファイルのアップロードに失敗");
      }
    } else {
      $imgPath = null;
    }
    return $usecase->handle(
      $created_by,
      $login_id,
      $raw_passsword,
      $nickname,
      $imgPath
    );
  }

  public function update(
    UpdateAdmin $usecase,
    string $admin_id,
    string $nickname,
    UploadedFile | null $profile_photo_url
  ) {
    $current = request()->user()->user?->profile_photo_url;

    if ($profile_photo_url) {
      try {
        $imgPath = $profile_photo_url->store(StorageSettings::ADMIN_PROFILE_STORAGE);
      } catch (\Throwable) {
        throw new ApplicationLoggerException(ApplicationCode::System, LogLevel::ALERT, "ファイルのアップロードに失敗");
      }
      if ($current) {
        Storage::delete($current);
      }
    } else {
      $imgPath = $current;
    }
    return $usecase->handle(
      $admin_id,
      $nickname,
      $imgPath
    );
  }


  public function delete(DeleteAdmin $usecase, string $admin_id)
  {
    return $usecase->handle($admin_id);
  }
}
