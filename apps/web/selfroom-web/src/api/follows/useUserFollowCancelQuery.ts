import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { useAuthContext } from '@/auth/hooks';
import { userQueryKeys } from '@/query-keys/userQueryKeys';

export const useUserFollowCancelQuery = (userId: string) => {
  const queryClient = useQueryClient();
  const { initialize } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .delete<EmptySuccessResponse>(
          USERS_ENDPOINTS.users.follows.cancel.url(userId)
        )
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries([followQueryKeys.followees.get]);
        queryClient.invalidateQueries([followQueryKeys.followers.get]);
        queryClient.invalidateQueries([userQueryKeys.profile.find]);
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
