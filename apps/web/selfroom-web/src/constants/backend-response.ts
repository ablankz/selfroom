// back 側
export const API_RESPONSE_TYPES = {
  Success: 0,
  System: 1,
  Validation: 2,
  Permission: 3,
  Unauthorized: 4,
  NotFound: 5,
  Unauthenticated: 6,
  PostTooLarge: 7,
  ThrottleRequests: 8,
  InvalidSignature: 9,
  StreamedResponse: 10,
  TokenMismatch: 11,
  MethodNotAllowed: 12,
  NotFoundModel: 13,
  TokenBlacklisted: 14,
  SocialLoginError: 15,
  ModelConflict: 16,
  GuestGuard: 17,
  UserOnly: 18,
  ThrottleLoginRequests: 19,
  FailedUpload: 20,
  AuthNotFound: 21,
  RefreshTokenExpired: 22,
  AlreadyLogout: 23,
} as const;