import { Endpoint } from '@/utils/axios';

export const PARTNER_ENDPOINTS: Endpoint = {
  partners: {
    all: {
      urlKey: '/partners/',
      method: 'GET',
      url: '/partners',
      comment: 'パートナー全取得',
    },
    find: {
      urlKey: '/partners/*/',
      method: 'GET',
      url: (id: number) => `/partners/${id}`,
      comment: 'パートナー検索',
    },
    create: {
      urlKey: '/partners/',
      method: 'POST',
      url: '/partners',
      comment: 'パートナー新規',
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
      urlKey: '/partners/*/',
      method: 'PUT',
      url: (id: number) => `/partners/${id}`,
      comment: 'パートナー情報更新',
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
      urlKey: '/partners/*/',
      method: 'DELETE',
      url: (id: number) => `/partners/${id}`,
      comment: 'パートナー削除',
    },
  },
};
