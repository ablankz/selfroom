import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { useAuthContext } from '@/auth/hooks';
import { favoriteQueryKeys } from '@/query-keys/favoriteQueryKeys';
import { roomVisitQueryKeys } from '@/query-keys/roomVisitQueryKeys';
import Echo from 'laravel-echo';

declare interface Window {
  Echo: Echo;
}

declare var window: Window;


export const useChatRoomOutQuery = () => {
  const queryClient = useQueryClient();
  const { initialize, user } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .post<EmptySuccessResponse>(CHAT_ROOMS_ENDPOINTS.chatRooms.out.url)
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        if (user?.currentChatRoom) {
          const channel = `chat-rooms.${user.currentChatRoom.chatRoomId}`;
          window.Echo.leave(channel);
        }
        queryClient.invalidateQueries([favoriteQueryKeys.favorites.get]);
        queryClient.invalidateQueries([
          roomVisitQueryKeys.visitRooms.get(user?.userId || ''),
        ]);
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
