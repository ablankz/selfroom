import { SplashScreen } from '@/components/loading-screen';
import { PATH_AFTER_LOGIN } from '@/config-global';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { getCookie, removeCookie } from '@/utils/cookie-handle';
import { useEffect } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { useAuthContext } from '@/auth/hooks';
import { useLocales } from '@/locales';

export default function CallbackPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const { t } = useLocales();

  const { socialCallback } = useAuthContext();

  useEffect(() => {
    const state = searchParams.get('state') || 'error';
    const returnTo = getCookie('loginReturnTo');

    if (returnTo) {
      if (state === 'success') {
        (async () => {
          await socialCallback().then((_) => {
            enqueueSnackbar({
              message: t('Login successfully'),
              variant: 'success',
            });
          });
        })();
      } else if (state === 'system-error') {
        enqueueSnackbar({
          message: t('An error has occurred on the server'),
          variant: 'error',
        });
      } else {
        enqueueSnackbar({
          message: t('Login failed'),
          variant: 'error',
        });
      }

      if (returnTo) {
        router.replace(returnTo);
      } else {
        router.replace(PATH_AFTER_LOGIN);
      }
      removeCookie('loginReturnTo');
    } else {
      const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;
      router.replace(returnTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SplashScreen />;
}
