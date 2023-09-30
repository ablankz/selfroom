import { useLocales } from '@/locales';
import { WorksView } from '@/sections/dashboard/works/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function WorksPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Works')}</title>
      </Helmet>

      <WorksView />
    </>
  );
}
