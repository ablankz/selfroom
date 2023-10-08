export const AUTH_ENDPOINTS = {
  auth: {
    login: {
      urlKey: '/auth/login',
      method: 'POST',
      url: '/auth/login',
      comment: 'ログイン',
      defaultBody: {
        login_id: 'admin',
        password: 'admin',
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
