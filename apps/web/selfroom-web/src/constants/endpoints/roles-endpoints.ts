export const ROLES_ENDPOINTS = {
  roles: {
    find: {
      urlKey: '/roles/*',
      method: 'GET',
      url: (id: string) => `/roles/${id}`,
      comment: 'Obtaining role information',
    },
    get: {
      urlKey: '/roles',
      method: 'GET',
      url: '/roles',
      comment: 'Retrieving the role list',
    },
  },
};
