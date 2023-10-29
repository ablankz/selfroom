import { GET_COMMON_PARAMS, GET_OPT_PARAMS } from '../common-params';

export const ROOM_CATEGORIES_ENDPOINTS = {
  roomCategories: {
    find: {
      urlKey: '/room-categories/*',
      method: 'GET',
      url: (id: string) => `/room-categories/${id}`,
      comment: 'Obtaining room category information',
    },
    get: {
      urlKey: '/room-categories',
      method: 'GET',
      url: '/room-categories',
      comment: 'Retrieving the room category list',
      defaultParam: {
        ...GET_COMMON_PARAMS,
        ...GET_OPT_PARAMS,
        order: 'name'
      },
    },
    create: {
      urlKey: '/room-categories',
      method: 'POST',
      url: '/room-categories',
      comment: 'Create a room category',
      defaultBody: {
        name: '作成カテゴリー名'
      },
    },
    update: {
      urlKey: '/room-categories/*',
      method: 'PUT',
      url: (id: string) => `/room-categories/${id}`,
      comment: 'Update room category information',
      defaultBody: {
        name: '更新後カテゴリー名'
      },
    },
    delete: {
      urlKey: '/room-categories/*',
      method: 'DELETE',
      url: (id: string) => `/room-categories/${id}`,
      comment: 'Delete room category',
    },
  },
};
