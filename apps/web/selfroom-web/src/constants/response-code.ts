import { API_RESPONSE_TYPES } from './backend-response';

export const RESPONSE_LEVEL = {
  Logout: 0, // ログアウトを強制
  Transition: 1, // ログイン画面へ遷移
  RequestRefreshToken: 2, // リフレッシュトークンの再生成を要求
  Modal: 3, // モーダル
  Toast: 4, //トースト
  None: 5, //何もなし
} as const;

type MessageType = {
  [id: number]: {
    message: string;
    level: (typeof RESPONSE_LEVEL)[keyof typeof RESPONSE_LEVEL];
  };
};

export const API_RESPONSE_HANDLING: MessageType = {
  [API_RESPONSE_TYPES.Success]: {
    message: 'success-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.System]: {
    message: 'system-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.Validation]: {
    message: 'validation-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Permission]: {
    message: 'permission-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Unauthorized]: {
    message: 'unauthorized-error-response',
    level: RESPONSE_LEVEL.RequestRefreshToken,
  },
  [API_RESPONSE_TYPES.NotFound]: {
    message: 'not-found-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.Unauthenticated]: {
    message: 'unauthenticated-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.PostTooLarge]: {
    message: 'post-too-large-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.ThrottleRequests]: {
    message: 'throttle-requests-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.InvalidSignature]: {
    message: 'invalid-signature-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.StreamedResponse]: {
    message: 'streamed-response-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.TokenMismatch]: {
    message: 'token-mismatch-error-response',
    level: RESPONSE_LEVEL.Modal,
  },
  [API_RESPONSE_TYPES.MethodNotAllowed]: {
    message: 'method-not-allowed-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotFoundModel]: {
    message: 'not-found-model-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.TokenBlacklisted]: {
    message: 'token-blacklisted-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.SocialLoginError]: {
    message: 'social-login-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.ModelConflict]: {
    message: 'model-conflict-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.GuestGuard]: {
    message: 'guest-guard-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.UserOnly]: {
    message: 'user-only-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.ThrottleLoginRequests]: {
    message: 'throttle-login-requests-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.FailedUpload]: {
    message: 'failed-upload-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.AuthNotFound]: {
    message: 'auth-not-found-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.RefreshTokenExpired]: {
    message: 'refresh-token-expired-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.AlreadyLogout]: {
    message: 'already-logout-error-response',
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.SqlQueryError]: {
    message: 'sql-query-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.AlreadyNotExist]: {
    message: 'already-not-exist-error-response',
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.NotMatchKey]: {
    message: 'not-match-key-error-response',
    level: RESPONSE_LEVEL.Toast,
  },
} as const;
