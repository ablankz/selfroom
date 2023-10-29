import { RequestParam } from "@/sections/dashboard/raw-api/view/raw-api-view";

export const GET_COMMON_PARAMS: RequestParam = {
  limit: 10,
  offset: 0,
  order: 'create',
  order_opt: 'desc',
} as const;

export const GET_OPT_PARAMS: RequestParam = {
  total_count: 'with',
} as const;

export const GET_CURSOR_OPT_PARAMS: RequestParam = {
  total_count: 'without',
  pagination: 'cursor',
  cursor: 'next page cursor'
} as const;