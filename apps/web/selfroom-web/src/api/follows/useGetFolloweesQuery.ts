import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { UserFolloweesResponse } from '@/types/response/user/user-followees-response';

export const useGetFolloweesQuery = (
  id: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [followQueryKeys.followees.get(id), { page, perPage }],
    () =>
      axios
        .get<UserFolloweesResponse>(
          USERS_ENDPOINTS.users.follows.followees.url(id),
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
