import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';
import { ChatRoomsCreateResponse } from '@/types/response/chat-room/chat-rooms-create-response';

export const useChatRoomCreateQuery = () => {
  const queryClient = useQueryClient();

  const { data, error, mutate, status } = useMutation(
    (mutateProps: FormData) =>
      axios
        .post<ChatRoomsCreateResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.create.url,
          mutateProps
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([chatRoomQueryKeys.list]);
      },
    }
  );

  return { data, error, status, mutate };
};
