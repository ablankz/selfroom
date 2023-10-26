import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { roomVisitQueryKeys } from '@/query-keys/roomVisitQueryKeys';
import { ChatRoomVisitorsResponse } from '@/types/response/chat-room/chat-room-visitors-response';

export const useGetVisitorsQuery = (
  id: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [roomVisitQueryKeys.visitors.get(id), { page, perPage }],
    () =>
      axios
        .get<ChatRoomVisitorsResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.roomVisits.visitors.url(id),
          {
            params: {
              limit: perPage,
              offset: (page - 1) * perPage,
              total_count: 'with',
              order: 'visited',
              order_opt: 'desc',
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
