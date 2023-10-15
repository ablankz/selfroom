import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { UserFolloweesResponse } from '@/types/response/user/user-followees-response';

export const useGetFolloweesQuery = (id: string) => {
  const { data, status, refetch } = useQuery(
    [followQueryKeys.followees.get(id)],
    () =>
      axios
        .get<UserFolloweesResponse>(USERS_ENDPOINTS.users.follows.followees.url(id))
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      retry: false,
    }
  );

  return { data, status, refetch };
};
