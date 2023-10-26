import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { ChatRoomResponse } from '@/types/response/chat-room/chat-room-response';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';

export const useGetChatRoomQuery = (id: string) => {
  const { data, status, refetch } = useQuery(
    [chatRoomQueryKeys.profile.find(id)],
    () =>
      axios
        .get<ChatRoomResponse>(CHAT_ROOMS_ENDPOINTS.chatRooms.find.url(id))
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
