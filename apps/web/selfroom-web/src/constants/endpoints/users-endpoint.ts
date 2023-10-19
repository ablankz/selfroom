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
    roomVisits: {
      visitRooms: {
        urlKey: '/users/*/visited-rooms',
        method: 'GET',
        url: (id: string) => `/users/${id}/visited-rooms`,
        comment: 'Retrieve room visit history',
      },
    },
    favorites: {
      favorites: {
        urlKey: '/users/*/favorites',
        method: 'GET',
        url: (id: string) => `/users/${id}/favorites`,
        comment: 'Retrieving favorite chat rooms',
      },
    },
    follows: {
      followees: {
        urlKey: '/users/*/followees',
        method: 'GET',
        url: (id: string) => `/users/${id}/followees`,
        comment: 'Retrieving following users',
      },
      followers: {
        urlKey: '/users/*/followers',
        method: 'GET',
        url: (id: string) => `/users/${id}/followers`,
        comment: 'Retrieving follower users',
      },
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
