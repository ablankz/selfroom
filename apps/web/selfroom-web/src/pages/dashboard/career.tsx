import { useLocales } from '@/locales';
import { CareerView } from '@/sections/dashboard/career/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function CareerPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Career')}</title>
      </Helmet>

      <CareerView />
    </>
  );
}
