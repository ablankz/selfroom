import { Helmet } from 'react-helmet-async';
// sections
import { IntroductionView } from '@/sections/dashboard/introduction/view';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function IntroductionPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Introduction')}</title>
      </Helmet>

      <IntroductionView />
    </>
  );
}
