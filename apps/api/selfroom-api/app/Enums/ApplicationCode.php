<?php

declare(strict_types=1);

namespace App\Enums;

use Symfony\Component\HttpFoundation\Response;

enum ApplicationCode: int
{
  case Success = 0;
  case System = 1;
  case Validation = 2;
  case Permission = 3;
  case Unauthorized = 4;
  case NotFound = 5;
  case Unauthenticated = 6;
  case PostTooLarge = 7;
  case ThrottleRequests = 8;
  case InvalidSignature = 9;
  case StreamedResponse = 10;
  case TokenMismatch = 11;
  case MethodNotAllowed = 12;
  case NotFoundModel = 13;
  case TokenBlacklisted = 14;
  case SocialLoginError = 15;
  case ModelConflict = 16;
  case GuestGuard = 17;
  case UserOnly = 18;
  case ThrottleLoginRequests = 19;
  case FailedUpload = 20;
  case AuthNotFound = 21;
  case RefreshTokenExpired = 22;
  case AlreadyLogout = 23;
  case SqlQueryError = 24;
  case AlreadyNotExist = 25;
  case NotMatchKey = 26;

  public function getText(): string
  {
    return match ($this) {
      self::Success => 'OK',
      self::System => 'システム上の不具合がありました',
      self::Validation => '入力情報に誤りがあります',
      self::Permission => '許可されていないアクションです',
      self::Unauthorized => '認証されていないユーザーです',
      self::NotFound => '指定されたエンドポイントが見つかりません',
      self::Unauthenticated => '認証に失敗しました',
      self::PostTooLarge => '許可される最大サイズを超えたデータが送信されました',
      self::ThrottleRequests => '短時間に複数のリクエストを受け付けました',
      self::InvalidSignature => '署名の有効期限切れです',
      self::StreamedResponse => 'ファイルのダウンロードに失敗しました',
      self::TokenMismatch => 'csrfトークンが一致しません',
      self::MethodNotAllowed => '指定のhttpメソッドはこのエンドポイントでサポートされていません',
      self::NotFoundModel => '対象のモデルが見つかりません',
      self::TokenBlacklisted => 'すでに削除されたトークンです',
      self::SocialLoginError => 'ソーシャルログインに失敗しました',
      self::ModelConflict => 'すでに存在するモデルです',
      self::GuestGuard => 'ログイン済みのユーザーです',
      self::UserOnly => '一般ユーザーのみ許可されているアクションです',
      self::ThrottleLoginRequests => '複数回ログインの試行に失敗しました',
      self::FailedUpload => 'ファイルのアップロードに失敗しました',
      self::AuthNotFound => '認証ユーザーが見つかりません',
      self::RefreshTokenExpired => 'リフレッシュトークンの有効期限が切れています',
      self::AlreadyLogout => 'すでにログアウト済みです',
      self::SqlQueryError => 'データベース上でエラーが発生しました',
      self::AlreadyNotExist => 'すでに削除されているデータです',
      self::NotMatchKey => 'キーに誤りがあります'
    };
  }

  public function getStatus(): int
  {
    return match ($this) {
      self::System => Response::HTTP_INTERNAL_SERVER_ERROR,
      self::Validation => Response::HTTP_BAD_REQUEST,
      self::Permission => Response::HTTP_FORBIDDEN,
      self::Unauthorized => Response::HTTP_FORBIDDEN,
      self::NotFound => Response::HTTP_NOT_FOUND,
      self::Unauthenticated => Response::HTTP_UNAUTHORIZED,
      self::PostTooLarge => Response::HTTP_REQUEST_ENTITY_TOO_LARGE,
      self::ThrottleRequests => Response::HTTP_TOO_MANY_REQUESTS,
      self::InvalidSignature => Response::HTTP_FORBIDDEN,
      self::StreamedResponse => Response::HTTP_BAD_REQUEST,
      self::TokenMismatch => 419,
      self::MethodNotAllowed => Response::HTTP_METHOD_NOT_ALLOWED,
      self::NotFoundModel => Response::HTTP_NOT_FOUND,
      self::TokenBlacklisted => Response::HTTP_BAD_REQUEST,
      self::SocialLoginError => Response::HTTP_UNAUTHORIZED,
      self::ModelConflict => Response::HTTP_CONFLICT,
      self::GuestGuard => Response::HTTP_FORBIDDEN,
      self::UserOnly => Response::HTTP_FORBIDDEN,
      self::ThrottleLoginRequests => Response::HTTP_TOO_MANY_REQUESTS,
      self::FailedUpload => Response::HTTP_INTERNAL_SERVER_ERROR,
      self::AuthNotFound => Response::HTTP_NOT_FOUND,
      self::RefreshTokenExpired => Response::HTTP_FORBIDDEN,
      self::AlreadyLogout => Response::HTTP_FORBIDDEN,
      self::SqlQueryError => Response::HTTP_INTERNAL_SERVER_ERROR,
      self::AlreadyNotExist => Response::HTTP_NOT_FOUND,
      self::NotMatchKey => Response::HTTP_FORBIDDEN
    };
  }
}
