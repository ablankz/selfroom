export const AUTH_ENDPOINTS = {
  auth: {
    login: {
      urlKey: '/auth/login',
      method: 'POST',
      url: '/auth/login',
      comment: 'Login',
      defaultBody: {
        loginId: 'test_user',
        password: 'test_user',
      },
    },
    register: {
      urlKey: '/users',
      method: 'POST',
      url: '/users',
      comment: 'New User Registration',
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
      comment: 'Obtaining an authenticated user',
    },
    logout: {
      urlKey: '/auth/logout',
      method: 'POST',
      url: '/auth/logout',
      comment: 'Logout',
    },
    refresh: {
      urlKey: '/auth/refresh',
      method: 'POST',
      url: '/auth/refresh',
      comment: 'Refresh Token Request',
    },
    oauth: {
      google: {
        urlKey: '/auth/google',
        method: 'GET',
        url: '/auth/google',
        comment: 'google social login'
      },
      line: {
        urlKey: '/auth/line',
        method: 'GET',
        url: '/auth/line',
        comment: 'line social login'
      },
    }
  },
};
