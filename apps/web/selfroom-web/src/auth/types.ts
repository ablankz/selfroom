// ----------------------------------------------------------------------

import {
  AuthUserData,
  AuthUserResponse,
} from '@/types/response/auth/auth-user-response';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { SocialProvider } from '@/types/social-provider';
import { AxiosResponse } from 'axios';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = AuthUserData | null;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  initialize: () => Promise<AxiosResponse<AuthUserResponse>>;
  rawInitialize: () => Promise<AxiosResponse<AuthUserResponse>>;
  login: (
    loginId: string,
    password: string
  ) => Promise<AxiosResponse<AuthUserResponse, any>>;
  register: (
    loginId: string,
    password: string,
    confirmPassword: string,
    nickname: string
  ) => Promise<AxiosResponse<AuthUserResponse, any>>;
  logout: () => Promise<AxiosResponse<EmptySuccessResponse, any>>;
  socialLogin: (provider: SocialProvider) => Promise<void>;
  socialCallback: () => Promise<AxiosResponse<AuthUserResponse, any>>;
  reset: () => void;
};
