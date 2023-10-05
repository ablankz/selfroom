import { SplashScreen } from "@/components/loading-screen";
import { PATH_AFTER_LOGIN } from "@/config-global";
import { useRouter, useSearchParams } from "@/routes/hooks";
import { getCookie, removeCookie } from "@/utils/cookie-handle";
import { useEffect } from "react";
import { useSnackbar } from '@/components/snackbar';

export default function CallbackPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();

  const state = searchParams.get('state') || 'error';

  useEffect(() => {
    const returnTo = getCookie("loginReturnTo");
    if (returnTo) {
      router.replace(returnTo);
    } else {
      router.replace(PATH_AFTER_LOGIN);
    }
    removeCookie("loginReturnTo");
    if(state === 'success'){
      enqueueSnackbar({
        message: "ログインしました",
        variant: "success"
      });
    }else if('system-error'){
      enqueueSnackbar({
        message: "サーバー上でエラーが発生しました",
        variant: "error"
      });
    }else{
      enqueueSnackbar({
        message: "ログインに失敗しました",
        variant: "error"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SplashScreen />;
}