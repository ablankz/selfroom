import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { SettingView } from '@/sections/dashboard/setting/view';

// ----------------------------------------------------------------------

export default function SettingPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title>{t('Application')}: {t('Setting')}</title>
      </Helmet>

      <SettingView />
    </>
  );
}
