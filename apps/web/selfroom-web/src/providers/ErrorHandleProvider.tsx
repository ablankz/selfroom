import { ReactNode, useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import axios from '@/utils/axios';
import { handleError } from '@/utils/api/handleError';
import { useSnackbar } from '@/components/snackbar';
import { useAuthContext } from '@/auth/hooks';
import { isApplicationErrorResponse } from '@/types/response/error-response';
import { LoadingScreen } from '@/components/loading-screen';
import { useLocales } from '@/locales';
import Echo from 'laravel-echo';

declare interface Window {
  Echo: Echo;
}

declare var window: Window;

type Props = {
  children: ReactNode;
};

const REFRESH_SECOND = 3;

export const ErrorHandleProvider = ({ children }: Props) => {
  const isRefreshingAccessToken = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitially, setIsLoadingInitially] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { logout, reset, initialize, user } = useAuthContext();
  const { t, currentLang } = useLocales();

  // 強制ログアウト
  const logoutForcibly = async (_: string) => {
    await logout();
  };

  // ログイン画面へ遷移する
  // あくまでフロント側のログアウト処理のみで、サーバ側へのログアウトリクエストは行わない
  const transitionToLogin = async (_: string) => {
    reset();
    setIsLoading(false);
  };

  // リフレッシュトークンを元にアクセストークンの再発行をリクエストする
  // リクエストに失敗した場合(有効なリフレッシュトークンが無い場合)は、ログアウトさせる
  const requestRefreshToken = async (_: string) => {
    if (isRefreshingAccessToken.current) return;
    isRefreshingAccessToken.current = true;
    setIsLoading(true);
    axios
      .post('auth/refresh')
      .then((_) => {
        // 同時送信のレスポンスの返却の確認が難しいため、setTimeoutより時間をあけて行っている.
        // なおこの時間はaccessTokenの有効期限内であれば、どれだけ長くてもいいはず。ただこの時間だけloading時間が長い。
        setTimeout(async () => {
          isRefreshingAccessToken.current = false;
          await initialize();
          setIsLoading(false);
          enqueueSnackbar({
            message: t('Updated certification information'),
            variant: 'success',
          });
        }, REFRESH_SECOND * 1000);
      })
      .catch(async (_) => {
        setIsLoading(false);
        setTimeout(async () => {
          isRefreshingAccessToken.current = false;
          // await initialize();
        }, REFRESH_SECOND * 1000);
      });
  };

  // Toast でエラーメッセージを表示
  const displayErrorToast = async (message: string) => {
    enqueueSnackbar({
      variant: 'error',
      message: t(message),
    });
  };

  useEffect(() => {
    // axiosの共通エラーハンドリング記述
    const responseInterceptors = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // 成功時(200代)のレスポンスハンドリング
        return response;
      },
      async (error: AxiosError<any>) => {
        if(!isApplicationErrorResponse(error)){
          const message = 'An unexpected error has occurred';
          displayErrorToast(message);
          return Promise.reject(error);
        }
        // エラーハンドリング
        const message = await handleError(error.response?.data, {
          logoutForcibly,
          transitionToLogin,
          requestRefreshToken,
          displayErrorToast,
        });
        if (!!error.response) {
          error.response.errorMessage = message;
        }

        return Promise.reject(error);
      }
    );

    setIsLoadingInitially(false);

    // クリーンアップ
    return () => {
      axios.interceptors.response.eject(responseInterceptors);
    };
  }, []);

  useEffect(() => {
    axios.defaults.headers.common['X-Sr-Language'] = currentLang.value;
    axios.defaults.headers.common['X-Socket-ID'] = window.Echo.socketId();
  }, [currentLang.value, user?.currentChatRoom]);

  if (isLoadingInitially) return null;
  if (isLoading) return <LoadingScreen />;
  return <>{children}</>;
};
