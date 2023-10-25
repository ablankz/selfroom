import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';
import { ChatResponse } from '@/types/response/chat-room/chat-response';
import { chatQueryKeys } from '@/query-keys/chatQueryKey';

type MutateProps = {
  content: string;
};

export const useChatCreateQuery = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  const { data, error, mutate, status } = useMutation(
    (mutateProps: MutateProps) =>
      axios
        .post<ChatResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.chats.create.url(chatRoomId),
          mutateProps
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([chatQueryKeys.list.get(chatRoomId)]);
        queryClient.invalidateQueries([chatRoomQueryKeys.profile.find(chatRoomId)]);
      },
    }
  );

  return { data, error, status, mutate };
};
