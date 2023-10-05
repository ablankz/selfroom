import { CLIENT_ENDPOINTS } from './endpoint/client-endpoint';
import { AUTH_ENDPOINTS } from './endpoint/auth-endpoint';
import { SHOP_ENDPOINTS } from './endpoint/shop-endpoint';
import { PARTNER_ENDPOINTS } from './endpoint/partner-endpoint';
import { RequestHeader } from '@/sections/dashboard/raw-api/view/raw-api-view';

export const DEFAULT_HEADERS: RequestHeader = {
  Authorization: 'Bearer {accessToken}'
}

export const ENDPOINTS = {
  ...CLIENT_ENDPOINTS,
  ...AUTH_ENDPOINTS,
  ...SHOP_ENDPOINTS,
  ...PARTNER_ENDPOINTS,
  jsonPlaceHolder: {
    todo: {
      find: {
        urlKey: 'https://jsonplaceholder.typicode.com/todos',
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos',
        comment: 'jsonplaeholderのtodo取得',
        defaultParam: {
          _limit: '5',
        },
      },
    },
  },
};
