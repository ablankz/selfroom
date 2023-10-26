import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';
// import { chatQueryKeys } from '@/query-keys/chatQueryKey';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';

export const useChatDeleteQuery = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  const { data, error, mutate, status } = useMutation(
    (chatId: string) =>
      axios
        .delete<EmptySuccessResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.chats.delete.url(chatRoomId, chatId)
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        // queryClient.invalidateQueries([chatQueryKeys.list.get(chatRoomId)]);
        queryClient.invalidateQueries([
          chatRoomQueryKeys.profile.find(chatRoomId),
        ]);
      },
    }
  );

  return { data, error, status, mutate };
};
