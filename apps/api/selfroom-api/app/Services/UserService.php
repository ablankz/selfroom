<?php

namespace App\Services;

use App\Constants\StorageSettings;
use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationLoggerException;
use App\Http\Resources\User\SimplifiedUserResourceCollection;
use App\Http\Resources\User\UserResource;
use App\Usecases\User\CreateUser;
use App\Usecases\User\DeleteUser;
use App\Usecases\User\FindUser;
use App\Usecases\User\GetUsers;
use App\Usecases\User\UpdateUser;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Psr\Log\LogLevel;

class UserService
{
  public function find(FindUser $usecase, string $user_id)
  {
    return new UserResource($usecase->handle($user_id));
  }

  public function get(GetUsers $usecase)
  {
    return new SimplifiedUserResourceCollection($usecase->handle());
  }

  public function create(
    CreateUser $usecase,
    string $login_id,
    string $raw_password,
    string $nickname,
    UploadedFile | null $profile_photo_url,
  ) {
    if ($profile_photo_url) {
      try {
        $imgPath = $profile_photo_url->store(StorageSettings::USER_PROFILE_STORAGE);
      } catch (\Throwable) {
        throw new ApplicationLoggerException(ApplicationCode::FailedUpload, LogLevel::ALERT, "ファイルのアップロードに失敗");
      }
    } else {
      $imgPath = null;
    }
    return $usecase->handle(
      $login_id,
      $raw_password,
      $nickname,
      $imgPath
    );
  }

  public function update(
    UpdateUser $usecase,
    string $user_id,
    string $nickname,
    UploadedFile | null $profile_photo_url,
    string | null $country,
    string | null $description,
    string | null $email,
    string | null $company,
    string | null $role,
    string | null $school
  ) {
    $current = request()->user()->user?->profile_photo_url;

    if ($profile_photo_url) {
      try {
        $imgPath = $profile_photo_url->store(StorageSettings::USER_PROFILE_STORAGE);
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
      $user_id,
      $nickname,
      $imgPath,
      $country,
      $description,
      $email,
      $company,
      $role,
      $school
    );
  }

  public function delete(DeleteUser $usecase, string $user_id)
  {
    return $usecase->handle($user_id);
  }
}
