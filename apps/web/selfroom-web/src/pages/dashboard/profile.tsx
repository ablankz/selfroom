import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { SettingView } from '@/sections/dashboard/setting/view';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { t } = useLocales();
  const { id } = useParams();

  useEffect(() => {
    // Do something with slug
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{t('Application')}: {t('Profile')}</title>
      </Helmet>
    {id}
      {/* <SettingView /> */}
    </>
  );
}
