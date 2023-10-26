import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';
import { ChatRoomsResponse } from '@/types/response/chat-room/chat-rooms-response';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';

export type RoomFilter = {
  query: string;
  queryBy: 'id' | 'name';
  hasKey: 'all' | 'true' | 'false';
  isFavorite: boolean;
  categories: RoomCategoriesData[];
  categoryBy: 'any' | 'all';
};

export type RoomSort = 'latest' | 'active' | 'users' | 'favors';

export const useGetChatRoomsQuery = (
  filters: RoomFilter,
  sort: RoomSort,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [chatRoomQueryKeys.list, { page, perPage, sort, filters }],
    () => {
      let order, order_opt;
      switch (sort) {
        case 'active':
          order = 'active';
          order_opt = 'desc';
          break;
        case 'favors':
          order = 'favorite';
          order_opt = 'desc';
          break;
        case 'users':
          order = 'in';
          order_opt = 'desc';
          break;
        case 'latest':
        default:
          order = 'update';
          order_opt = 'desc';
      }
      return axios
        .get<ChatRoomsResponse>(CHAT_ROOMS_ENDPOINTS.chatRooms.get.url, {
          params: {
            limit: perPage,
            offset: (page - 1) * perPage,
            total_count: 'with',
            order,
            order_opt,
            search_type: filters.queryBy,
            search: filters.query,
            is_lock: filters.hasKey,
            is_favorite: filters.isFavorite ? 'true': 'all',
            categories: filters.categories.map(e => e.roomCategoryId).join('+'),
            category_select_type: filters.categoryBy,
          },
        })
        .then((res) => res.data);
    },
    {
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      keepPreviousData: true,
      retry: false,
    }
  );

  return { data, status, refetch };
};
