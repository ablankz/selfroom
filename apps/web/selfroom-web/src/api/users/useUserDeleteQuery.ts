import { useMutation } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { useAuthContext } from '@/auth/hooks';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';

export const useUserDeleteQuery = () => {
  const { initialize } = useAuthContext();
  const { data, error, mutate, status } = useMutation(
    () =>
      axios
        .delete<EmptySuccessResponse>(USERS_ENDPOINTS.users.update.url)
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
