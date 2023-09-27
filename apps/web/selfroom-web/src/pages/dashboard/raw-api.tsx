import { Helmet } from 'react-helmet-async';
// sections
import { RawApiView } from '@/sections/dashboard/raw-api/view';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function RawApiPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Application')}: {t('RawApi')}</title>
      </Helmet>

      <RawApiView />
    </>
  );
}
