import { useMutation } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { USERS_ENDPOINTS } from '@/constants/endpoints';
import { useAuthContext } from '@/auth/hooks';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';

export type UserUpdateRequest = {
  nickname: string;
  profilePhoto?: any;
  country?: string;
  description?: string;
  email?: string;
  company?: string;
  role?: string;
  school?: string;
};

export const useUserUpdateQuery = () => {
  const { initialize } = useAuthContext();
  const { data, error, mutate, status } = useMutation(
    (props: FormData) =>
      axios
        .post<EmptySuccessResponse>(USERS_ENDPOINTS.users.update.url, props, {
          headers: {
            'X-HTTP-Method-Override': 'PUT',
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (_) => {
        initialize();
      },
    }
  );

  return { data, error, status, mutate };
};
