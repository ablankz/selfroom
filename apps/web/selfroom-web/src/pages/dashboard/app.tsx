import { Helmet } from 'react-helmet-async';
// sections
import { OverviewAppView } from '@/sections/dashboard/app/view';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('Overview')}</title>
      </Helmet>

      <OverviewAppView />
    </>
  );
}
