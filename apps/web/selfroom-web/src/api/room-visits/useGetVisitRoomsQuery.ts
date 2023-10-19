import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { roomVisitQueryKeys } from '@/query-keys/roomVisitQueryKeys';
import { UserVisitedRoomsResponse } from '@/types/response/user/user-visited-rooms-response';

export const useGetVisitRoomsQuery = (
  id: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [roomVisitQueryKeys.visitRooms.get(id), { page, perPage }],
    () =>
      axios
        .get<UserVisitedRoomsResponse>(
          USERS_ENDPOINTS.users.roomVisits.visitRooms.url(id),
          {
            params: {
              limit: perPage,
              offset: (page - 1) * perPage,
              total_count: 'with',
              order: 'visited',
              order_opt: 'desc'
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
