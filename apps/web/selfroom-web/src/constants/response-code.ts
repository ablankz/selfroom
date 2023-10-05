import { API_RESPONSE_TYPES } from "./backend-response";

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
    message: "OK",
    level: RESPONSE_LEVEL.None,
  },
  [API_RESPONSE_TYPES.System]: {
    message: "システム上の不具合がありました",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.Validation]: {
    message: "入力情報に誤りがあります",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.Permission]: {
    message: "許可されていないアクションです",
    level: RESPONSE_LEVEL.Modal,
  },
  [API_RESPONSE_TYPES.Unauthorized]: {
    message: "認証されていないユーザーです",
    level: RESPONSE_LEVEL.RequestRefreshToken,
  },
  [API_RESPONSE_TYPES.NotFound]: {
    message: "指定されたエンドポイントが見つかりません",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.Unauthenticated]: {
    message: "認証に失敗しました",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.PostTooLarge]: {
    message: "許可される最大サイズを超えたデータが送信されました",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.ThrottleRequests]: {
    message: "短時間に複数のリクエストを受け付けました",
    level: RESPONSE_LEVEL.Logout,
  },
  [API_RESPONSE_TYPES.InvalidSignature]: {
    message: "署名の有効期限切れです",
    level: RESPONSE_LEVEL.Modal,
  },
  [API_RESPONSE_TYPES.StreamedResponse]: {
    message: "ファイルのダウンロードに失敗しました",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.TokenMismatch]: {
    message: "csrfトークンが一致しません",
    level: RESPONSE_LEVEL.Modal,
  },
  [API_RESPONSE_TYPES.MethodNotAllowed]: {
    message: "指定のhttpメソッドはこのエンドポイントでサポートされていません",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.NotFoundModel]: {
    message: "対象のモデルが見つかりません",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.TokenBlacklisted]: {
    message: "すでに削除されたトークンです",
    level: RESPONSE_LEVEL.Transition,
  },
  [API_RESPONSE_TYPES.SocialLoginError]: {
    message: "ソーシャルログインに失敗しました",
    level: RESPONSE_LEVEL.Toast,
  },
  [API_RESPONSE_TYPES.ModelConflict]: {
    message: "すでに存在するモデルです",
    level: RESPONSE_LEVEL.Toast,
  },
} as const;