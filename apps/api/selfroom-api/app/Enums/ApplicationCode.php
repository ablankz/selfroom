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
      self::Success => 'success-response',
      self::System => 'system-error-response',
      self::Validation => 'validation-error-response',
      self::Permission => 'permission-error-response',
      self::Unauthorized => 'unauthorized-error-response',
      self::NotFound => 'not-found-error-response',
      self::Unauthenticated => 'unauthenticated-error-response',
      self::PostTooLarge => 'post-too-large-error-response',
      self::ThrottleRequests => 'throttle-requests-error-response',
      self::InvalidSignature => 'invalid-signature-error-response',
      self::StreamedResponse => 'streamed-response-error-response',
      self::TokenMismatch => 'token-mismatch-error-response',
      self::MethodNotAllowed => 'method-not-allowed-error-response',
      self::NotFoundModel => 'not-found-model-error-response',
      self::TokenBlacklisted => 'token-blacklisted-error-response',
      self::SocialLoginError => 'social-login-error-response',
      self::ModelConflict => 'model-conflict-error-response',
      self::GuestGuard => 'guest-guard-error-response',
      self::UserOnly => 'user-only-error-response',
      self::ThrottleLoginRequests => 'throttle-login-requests-error-response',
      self::FailedUpload => 'failed-upload-error-response',
      self::AuthNotFound => 'auth-not-found-error-response',
      self::RefreshTokenExpired => 'refresh-token-expired-error-response',
      self::AlreadyLogout => 'already-logout-error-response',
      self::SqlQueryError => 'sql-query-error-response',
      self::AlreadyNotExist => 'already-not-exist-error-response',
      self::NotMatchKey => 'not-match-key-error-response'
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
