import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { useAuthContext } from '@/auth/hooks';
import { userQueryKeys } from '@/query-keys/userQueryKeys';
import { favoriteQueryKeys } from '@/query-keys/favoriteQueryKeys';

export const useRoomFavoriteCancelQuery = (chatRoomId: string) => {
  const queryClient = useQueryClient();
  const { initialize } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .delete<EmptySuccessResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.favorites.cancel.url(chatRoomId)
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([favoriteQueryKeys.favors.get]);
        queryClient.invalidateQueries([userQueryKeys.profile.find]);
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
