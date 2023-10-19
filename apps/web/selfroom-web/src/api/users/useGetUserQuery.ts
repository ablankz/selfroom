import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { userQueryKeys } from '@/query-keys/userQueryKeys';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { UserResponse } from '@/types/response/user/user-response';

export const useGetUserQuery = (id: string) => {
  const { data, status, refetch } = useQuery(
    [userQueryKeys.profile.find(id)],
    () =>
      axios
        .get<UserResponse>(USERS_ENDPOINTS.users.find.url(id))
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
