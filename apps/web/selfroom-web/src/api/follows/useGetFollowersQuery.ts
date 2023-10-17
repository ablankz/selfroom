import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { UserFollowersResponse } from '@/types/response/user/user-followers-response';

export const useGetFollowersQuery = (
  id: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [followQueryKeys.followers.get(id), { page, perPage }],
    () =>
      axios
        .get<UserFollowersResponse>(
          USERS_ENDPOINTS.users.follows.followers.url(id),
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
