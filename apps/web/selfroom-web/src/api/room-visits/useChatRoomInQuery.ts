import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { useAuthContext } from '@/auth/hooks';
import { favoriteQueryKeys } from '@/query-keys/favoriteQueryKeys';
import { roomVisitQueryKeys } from '@/query-keys/roomVisitQueryKeys';

type MutateProps = {
  keyword?: string;
}

export const useChatRoomInQuery = (chatRoomId: string) => {
  const queryClient = useQueryClient();
  const { initialize, user } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    (mutateProps: MutateProps) =>
      axios
        .post<EmptySuccessResponse>(
          CHAT_ROOMS_ENDPOINTS.chatRooms.in.url(chatRoomId), mutateProps)
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([favoriteQueryKeys.favorites.get]);
        queryClient.invalidateQueries([roomVisitQueryKeys.visitRooms.get(user?.userId || '')]);
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
