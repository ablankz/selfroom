import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '@/utils/axios';
//
import { AuthContext } from './auth-context';
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import { AUTH_ENDPOINTS } from '@/constants/endpoint/auth-endpoint';
import { SocialProvider } from '@/types/social-provider';
import { SocialLoginResponse } from '@/types/response/auth/social-login-response';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/response/error-response';
import { useSearchParams } from '@/routes/hooks';
import { PATH_AFTER_LOGIN } from '@/config-global';
import { setCookie } from '@/utils/cookie-handle';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  SOCIAL_LOGIN = 'SOCIAL_LOGIN'
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
  [Types.SOCIAL_LOGIN]: {
    user: AuthUserType;
  };
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
  if (action.type === Types.SOCIAL_LOGIN) {
    return {
      ...state,
      user: action.payload.user,
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

  const initialize = useCallback(async () => {
    try {
      const res = await axios.post(AUTH_ENDPOINTS.auth.me.url);

      const { user } = res.data;

      dispatch({
        type: Types.INITIAL,
        payload: {
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (loginId: string, password: string) => {
    const data = {
      login_id: loginId,
      password,
    };

    await axios.post(AUTH_ENDPOINTS.auth.login.url, data)
    .then(async _ => {
      await initialize()
    })

    const { user } = res.data;

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (user_id: string, password: string, nickname: string) => {
      const data = {
        user_id,
        password,
        nickname,
      };

      const res = await axios.post(AUTH_ENDPOINTS.auth.login.url, data);

      const { user } = res.data;

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // SOCIAL LOGIN
  const socialLogin = useCallback(async (provider: SocialProvider) => {
    await axios.get<SocialLoginResponse>(AUTH_ENDPOINTS.auth.oauth[provider].url)
    .then(res => {
      const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;
      setCookie("loginReturnTo", returnTo);
      window.location.href = res.data.data.redirect_url;
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.code);
    })
  }, []);

  const socialCallback = useCallback(() => {
    dispatch({
      type: Types.SOCIAL_LOGIN,
      payload: {
        user
      }
    });
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
      login,
      register,
      logout,
      socialLogin
    }),
    [login, logout, register, socialLogin, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
