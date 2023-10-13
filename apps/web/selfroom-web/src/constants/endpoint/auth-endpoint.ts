export const AUTH_ENDPOINTS = {
  auth: {
    login: {
      urlKey: '/auth/login',
      method: 'POST',
      url: '/auth/login',
      comment: 'ログイン',
      defaultBody: {
        loginId: 'test_user',
        password: 'test_user',
      },
    },
    register: {
      urlKey: '/users',
      method: 'POST',
      url: '/users',
      comment: 'ユーザーの新規登録',
      defaultBody: {
        nickname: 'テストユーザー',
        loginId: 'test_user',
        password: 'test_user',
        confirmPassword: 'test_user'
      },
    },
    me: {
      urlKey: '/auth/me',
      method: 'POST',
      url: '/auth/me',
      comment: '認証ユーザーの取得',
    },
    logout: {
      urlKey: '/auth/logout',
      method: 'POST',
      url: '/auth/logout',
      comment: 'ログアウト',
    },
    refresh: {
      urlKey: '/auth/refresh',
      method: 'POST',
      url: '/auth/refresh',
      comment: 'リフレッシュトークン',
    },
    oauth: {
      google: {
        urlKey: '/auth/google',
        method: 'GET',
        url: '/auth/google',
        comment: 'googleソーシャルログイン'
      },
      line: {
        urlKey: '/auth/line',
        method: 'GET',
        url: '/auth/line',
        comment: 'lineソーシャルログイン'
      },
    }
  },
};
