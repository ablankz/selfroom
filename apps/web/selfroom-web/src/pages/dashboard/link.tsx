import { useLocales } from '@/locales';
import { LinkView } from '@/sections/dashboard/link/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function LinkPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Link')}</title>
      </Helmet>

      <LinkView />
    </>
  );
}
