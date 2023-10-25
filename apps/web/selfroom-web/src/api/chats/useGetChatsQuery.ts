import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { chatQueryKeys } from '@/query-keys/chatQueryKey';
import { ChatsResponse } from '@/types/response/chat-room/chats-response';

export const useGetChatsQuery = (
  chatRoomId: string,
  page: number,
  perPage: number
) => {
  const { data, status, refetch } = useQuery(
    [chatQueryKeys.list.get(chatRoomId), { page, perPage }],
    () =>
      axios
        .get<ChatsResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.chats.get.url(chatRoomId),
          {
            params: {
              limit: perPage,
              offset: (page - 1) * perPage,
              order: 'create',
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
