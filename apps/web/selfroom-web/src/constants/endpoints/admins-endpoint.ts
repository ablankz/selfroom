export const ADMINS_ENDPOINTS = {
  admins: {
    find: {
      urlKey: '/admins/*',
      method: 'GET',
      url: (id: string) => `/admins/${id}`,
      comment: 'Obtaining administrator information',
    },
    get: {
      urlKey: '/admins',
      method: 'GET',
      url: '/admins',
      comment: 'Retrieving the administrator list',
    },
    create: {
      urlKey: '/admins',
      method: 'POST',
      url: '/admins',
      comment: 'Create an administrator',
      defaultBody: {
        nickname: '管理者ユーザー',
        loginId: 'admin_user',
        password: 'admin_user',
        confirmPassword: 'admin_user',
      },
    },
    update: {
      urlKey: '/admins',
      method: 'PUT',
      url: '/admins',
      comment: 'Update authenticated administrator information',
      defaultBody: {
        nickname: '管理者ユーザー',
        profilePhoto: 'This type is not supported',
      },
    },
    delete: {
      urlKey: '/admins',
      method: 'DELETE',
      url: '/admins',
      comment: 'Delete authenticated administrator',
    },
    permissions: {
      grant: {
        urlKey: '/admins/*/permissions',
        method: 'POST',
        url: (id: string) => `/admins/${id}/permissions`,
        comment: 'Granting Authority to Administrators',
        defaultBody: {
          roles: 'This type is not supported',
        },
      },
      revoke: {
        urlKey: '/admins/*/permissions',
        method: 'DELETE',
        url: (id: string) => `/admins/${id}/permissions`,
        comment: "Revoke the administrator's authority",
        defaultBody: {
          roles: 'This type is not supported',
        },
      },
      revokeAll: {
        urlKey: '/admins/*/permissions/all',
        method: 'DELETE',
        url: (id: string) => `/admins/${id}/permissions/all`,
        comment: 'Revoke all administrative privileges',
      },
    },
  },
};
