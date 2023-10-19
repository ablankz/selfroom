import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { AuthRegisterView } from '@/sections/dashboard/auth-register/view';

// ----------------------------------------------------------------------

export default function AuthRegisterPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title>{t('Application')}: {t('Register')}</title>
      </Helmet>

      <AuthRegisterView />
    </>
  );
}
