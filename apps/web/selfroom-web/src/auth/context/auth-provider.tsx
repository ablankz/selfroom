import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '@/utils/axios';
//
import { AuthContext } from './auth-context';
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import { AUTH_ENDPOINTS } from '@/constants/endpoint/auth-endpoint';
import { SocialProvider } from '@/types/social-provider';
import { SocialLoginResponse } from '@/types/response/auth/social-login-response';
import { useSearchParams } from '@/routes/hooks';
import { PATH_AFTER_LOGIN } from '@/config-global';
import { setCookie } from '@/utils/cookie-handle';
import { AxiosResponse } from 'axios';
import { AuthUserResponse } from '@/types/response/auth/auth-user-response';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchParams = useSearchParams();

  const initialize = useCallback(async (): Promise<
    AxiosResponse<AuthUserResponse>
  > => {
    try {
      const res = await axios.post<AuthUserResponse>(
        AUTH_ENDPOINTS.auth.me.url
      );

      const { data } = res.data;

      dispatch({
        type: Types.INITIAL,
        payload: {
          user: data,
        },
      });

      return res;
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
      return Promise.reject(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (
      loginId: string,
      password: string
    ): Promise<AxiosResponse<AuthUserResponse, any>> => {
      const data = {
        login_id: loginId,
        password,
      };

      return await axios
        .post(AUTH_ENDPOINTS.auth.login.url, data)
        .then(async (_) => {
          return await initialize();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    []
  );

  // REGISTER
  const register = useCallback(
    async (
      user_id: string,
      password: string,
      nickname: string
    ): Promise<AxiosResponse<AuthUserResponse, any>> => {
      const data = {
        user_id,
        password,
        nickname,
      };

      return await axios
        .post(AUTH_ENDPOINTS.auth.login.url, data)
        .then(async (_) => {
          return await initialize();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async (): Promise<
    AxiosResponse<EmptySuccessResponse, any>
  > => {
    return await axios
      .post<EmptySuccessResponse>(AUTH_ENDPOINTS.auth.logout.url)
      .then((data) => {
        dispatch({
          type: Types.LOGOUT,
        });
        return data;
      })
      .catch((error) => {
        dispatch({
          type: Types.LOGOUT,
        });
        return Promise.reject(error);
      });
  }, []);

  // SOCIAL LOGIN
  const socialLogin = useCallback(
    async (provider: SocialProvider): Promise<void> => {
      await axios
        .get<SocialLoginResponse>(AUTH_ENDPOINTS.auth.oauth[provider].url)
        .then((res) => {
          const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;
          setCookie('loginReturnTo', returnTo);
          window.location.href = res.data.data.redirect_url;
        });
    },
    []
  );

  const socialCallback = useCallback(async (): Promise<
    AxiosResponse<AuthUserResponse, any>
  > => {
    return await initialize()
      .then((data) => data)
      .catch((error) => Promise.reject(error));
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      initialize,
      login,
      register,
      logout,
      socialLogin,
      socialCallback,
    }),
    [initialize, login, logout, register, socialLogin, socialCallback, state.user, status]
  );

  console.log(memoizedValue.user, memoizedValue.authenticated);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
