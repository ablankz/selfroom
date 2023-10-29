import { GET_COMMON_PARAMS, GET_OPT_PARAMS } from '../common-params';

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
      defaultParam: {
        ...GET_COMMON_PARAMS,
        ...GET_OPT_PARAMS,
        order: 'name'
      },
    },
  },
};
