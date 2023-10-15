import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { followQueryKeys } from '@/query-keys/followQueryKeys';
import { useAuthContext } from '@/auth/hooks';
import { userQueryKeys } from '@/query-keys/userQueryKeys';

export const useUserFollowQuery = (userId: string) => {
  const queryClient = useQueryClient();
  const { initialize } = useAuthContext();

  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .post<EmptySuccessResponse>(
          USERS_ENDPOINTS.users.follows.add.url(userId)
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
