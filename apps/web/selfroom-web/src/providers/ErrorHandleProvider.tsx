import { ReactNode, useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import axios from '@/utils/axios';
import { handleError } from '@/utils/api/handleError';
import { useSnackbar } from '@/components/snackbar';
import { useAuthContext } from '@/auth/hooks';
import { ErrorResponse } from '@/types/response/error-response';
import { LoadingScreen } from '@/components/loading-screen';
import { useLocales } from '@/locales';

type Props = {
  children: ReactNode;
};

const REFRESH_SECOND = 3;

export const ErrorHandleProvider = ({ children }: Props) => {
  const isRefreshingAccessToken = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitially, setIsLoadingInitially] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();
  const { t } = useLocales();

  // 強制ログアウト
  const logoutForcibly = async (_: string) => {
    await logout();
  };

  // ログイン画面へ遷移する
  // あくまでフロント側のログアウト処理のみで、サーバ側へのログアウトリクエストは行わない
  const transitionToLogin = async (_: string) => {
    // setIsResettingCurrentUser(true);
    setIsLoading(false);
  };

  // リフレッシュトークンを元にアクセストークンの再発行をリクエストする
  // リクエストに失敗した場合(有効なリフレッシュトークンが無い場合)は、ログアウトさせる
  const requestRefreshToken = async (_: string) => {
    if (isRefreshingAccessToken.current) return;
    isRefreshingAccessToken.current = true;
    setIsLoading(true);
    axios
      .get('auth/refresh-token')
      .then((res) => {
        // リクエスト後の処理
        // console.log('画面のリロード');
        // window.location.reload();
        // リロードするか、同時に送信したリクエストのレスポンスが届いたことを確認した後、以下のコードを実行するか
        // 同時送信のレスポンスの返却の確認が難しいため、setTimeoutより時間をあけて行っている.
        // なおこの時間はaccessTokenの有効期限内であれば、どれだけ長くてもいいはず。ただこの時間だけloading時間が長い。
        setTimeout(() => {
          setIsLoading(false);
          isRefreshingAccessToken.current = false;
        }, REFRESH_SECOND * 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        setTimeout(() => {
          isRefreshingAccessToken.current = false;
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
      async (error: AxiosError<ErrorResponse>) => {
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

  if (isLoadingInitially) return null;
  if (isLoading) return <LoadingScreen />;
  return <>{children}</>;
};
