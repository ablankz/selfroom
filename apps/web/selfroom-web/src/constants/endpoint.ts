import {
  AUTH_ENDPOINTS,
  USERS_ENDPOINTS,
  ADMINS_ENDPOINTS,
  ROOM_CATEGORIES_ENDPOINTS,
  ROLES_ENDPOINTS,
  CHAT_ROOMS_ENDPOINTS,
} from './endpoints';
import { RequestHeader } from '@/sections/dashboard/raw-api/view/raw-api-view';

export const DEFAULT_HEADERS: RequestHeader = {
  'X-Sr-Language': 'ja',
} as const;

export const ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...USERS_ENDPOINTS,
  ...ADMINS_ENDPOINTS,
  ...ROOM_CATEGORIES_ENDPOINTS,
  ...ROLES_ENDPOINTS,
  ...CHAT_ROOMS_ENDPOINTS,
};
