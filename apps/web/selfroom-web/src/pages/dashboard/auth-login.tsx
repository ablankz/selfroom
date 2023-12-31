import { Helmet } from 'react-helmet-async';
// sections
import { AuthLoginView } from '@/sections/dashboard/auth-login/view';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function AuthLoginPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title>{t('Application')}: {t('Login')}</title>
      </Helmet>

      <AuthLoginView />
    </>
  );
}
