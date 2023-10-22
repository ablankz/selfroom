import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { ROOM_CATEGORIES_ENDPOINTS } from '@/constants/endpoints';
import { roomCategoryQueryKeys } from '@/query-keys/roomCategoryQueryKey';
import { RoomCategoriesResponse } from '@/types/response/room-category/room-categories-response';

export const useGetRoomCategoriesQuery = () => {
  const { data, status, refetch } = useQuery(
    [roomCategoryQueryKeys.list],
    () =>
      axios
        .get<RoomCategoriesResponse>(
          ROOM_CATEGORIES_ENDPOINTS.roomCategories.get.url,
          {
            params: {
              order: 'name',
              order_opt: 'asc',
            },
          }
        )
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      retry: false,
    }
  );

  return { data, status, refetch };
};
