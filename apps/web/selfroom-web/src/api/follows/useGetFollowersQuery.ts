import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { UserFollowersResponse } from '@/types/response/user/user-followers-response';

export const useGetFollowersQuery = (id: string) => {
  const { data, status, refetch } = useQuery(
    [followQueryKeys.followers.get(id)],
    () =>
      axios
        .get<UserFollowersResponse>(USERS_ENDPOINTS.users.follows.followers.url(id))
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
