import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { useAuthContext } from '@/auth/hooks';
import { userQueryKeys } from '@/query-keys/userQueryKeys';
import { favoriteQueryKeys } from '@/query-keys/favoriteQueryKeys';
import { chatRoomQueryKeys } from '@/query-keys/chatRoomQueryKey';

export const useRoomFavoriteQuery = (chatRoomId: string) => {
  const queryClient = useQueryClient();
  const { initialize } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .post<EmptySuccessResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.favorites.add.url(chatRoomId)
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([favoriteQueryKeys.favorites.get]);
        queryClient.invalidateQueries([userQueryKeys.profile.find]);
        queryClient.invalidateQueries([chatRoomQueryKeys.profile.find]);
        queryClient.invalidateQueries([chatRoomQueryKeys.list]);
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
