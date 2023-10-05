// ----------------------------------------------------------------------

import { SocialProvider } from "@/types/social-provider";

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

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

type CanRemove = {
  login?: (loginId: string, password: string) => Promise<void>;
  register?: (
    loginId: string,
    password: string,
    nickname: string,
  ) => Promise<void>;
};

export type JWTContextType = CanRemove & {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (loginId: string, password: string) => Promise<void>;
  register: (loginId: string, password: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (provider: SocialProvider) => Promise<void>; 
};
