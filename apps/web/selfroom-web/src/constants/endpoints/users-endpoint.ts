export const USERS_ENDPOINTS = {
  users: {
    find: {
      urlKey: '/users/*',
      method: 'GET',
      url: (id: string) => `/users/${id}`,
      comment: 'Obtaining user information',
    },
    get: {
      urlKey: '/users',
      method: 'GET',
      url: '/users',
      comment: 'Retrieving the user list',
    },
    update: {
      urlKey: '/users',
      method: 'PUT',
      url: '/users',
      comment: 'Update authenticated user information',
      defaultBody: {
        nickname: 'テストユーザー',
        profilePhoto: 'This type is not supported',
      },
    },
    delete: {
      urlKey: '/users',
      method: 'DELETE',
      url: '/users',
      comment: 'Delete authenticated user',
    },
    follows: {
      add: {
        urlKey: '/users/*/follows',
        method: 'POST',
        url: (id: string) => `/users/${id}/follows`,
        comment: 'Follow a user',
      },
      cancel: {
        urlKey: '/users/*/follows',
        method: 'DELETE',
        url: (id: string) => `/users/${id}/follows`,
        comment: 'Unfollowing a user',
      },
    },
  },
};
