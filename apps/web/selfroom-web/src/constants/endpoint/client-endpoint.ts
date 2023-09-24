import { Endpoint } from '@/utils/axios';

export const CLIENT_ENDPOINTS: Endpoint = {
  clients: {
    all: {
      urlKey: '/clients/',
      method: 'GET',
      url: '/clients',
      comment: 'クライアント全取得',
    },
    find: {
      urlKey: '/clients/*/',
      method: 'GET',
      url: (id: number) => `/clients/${id}`,
      comment: 'クライアント検索',
    },
    create: {
      urlKey: '/clients/',
      method: 'POST',
      url: '/clients',
      comment: 'クライアント新規',
      defaultBody: {
        name: 'テスト用ユーザー',
        address: 'テスト用住所',
        mailaddress: 'api@test.test',
        site_url: 'http://test.test/test',
        tel: '000-0000-0000',
        fax: '111-1111-1111',
        charge: '担当 職員',
        plan: 'スタンダード',
        design: 'デザインです',
        is_open: 'true',
      },
    },
    update: {
      urlKey: '/clients/*/',
      method: 'PUT',
      url: (id: number) => `/clients/${id}`,
      comment: 'クライアント情報更新',
      defaultBody: {
        name: 'テスト用更新ユーザー',
        address: 'テスト用更新後住所',
        mailaddress: 'api@test.test',
        site_url: 'http://test.test/test',
        tel: '000-0000-0000',
        fax: '111-1111-1111',
        charge: '担当 職員',
        plan: 'プレミアム',
        design: 'デザインです',
        is_open: 'true',
      },
    },
    delete: {
      urlKey: '/clients/*/',
      method: 'DELETE',
      url: (id: number) => `/clients/${id}`,
      comment: 'クライアント削除',
    },
  },
};
