import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { UserFollowersResponse } from '@/types/response/user/user-followers-response';
import { favoriteQueryKeys } from '@/query-keys/favoriteQueryKeys';

export const useGetFavorsQuery = (
  id: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [favoriteQueryKeys.favors.get(id), { page, perPage }],
    () =>
      axios
        .get<UserFollowersResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.favorites.favors.url(id),
          {
            params: {
              limit: perPage,
              offset: (page - 1) * perPage,
              total_count: 'with',
              order: 'name',
            },
          }
        )
        .then((res) => res.data),
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
