import { Endpoint } from '@/utils/axios';

export const SHOP_ENDPOINTS: Endpoint = {
  shops: {
    all: {
      urlKey: '/shops/',
      method: 'GET',
      url: '/shops',
      comment: 'ショップ全取得',
    },
    find: {
      urlKey: '/shops/*/',
      method: 'GET',
      url: (id: number) => `/shops/${id}`,
      comment: 'ショップ検索',
    },
    create: {
      urlKey: '/shops/',
      method: 'POST',
      url: '/shops',
      comment: 'ショップ新規',
      defaultBody: {
        name: 'テスト用ユーザー',
        address: 'テスト用住所',
        mailaddress: 'api@test.test',
        site_url: 'http://test.test/test',
        tel: '000-0000-0000',
        fax: '111-1111-1111',
        charge: '担当 職員',
        plan: 'スタンダード',
        is_open: 'true',
      },
    },
    update: {
      urlKey: '/shops/*/',
      method: 'PUT',
      url: (id: number) => `/shops/${id}`,
      comment: 'ショップ情報更新',
      defaultBody: {
        name: 'テスト用更新ユーザー',
        address: 'テスト用更新後住所',
        mailaddress: 'api@test.test',
        site_url: 'http://test.test/test',
        tel: '000-0000-0000',
        fax: '111-1111-1111',
        charge: '担当 職員',
        plan: 'プレミアム',
        is_open: 'true',
      },
    },
    delete: {
      urlKey: '/shops/*/',
      method: 'DELETE',
      url: (id: number) => `/shops/${id}`,
      comment: 'ショップ削除',
    },
  },
};
