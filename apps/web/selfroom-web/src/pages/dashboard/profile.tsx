import { Helmet } from 'react-helmet-async';
// sections
import { useLocales } from '@/locales';
import { ProfileView } from '@/sections/dashboard/profile/view';
import { Suspense, useEffect, useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { useParams } from '@/routes/hooks';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { t } = useLocales();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    id && setUserId(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          {t('Application')}: {t('Profile')}
        </title>
      </Helmet>

      {userId ? (
        <Suspense fallback={<LoadingScreen />}>
          <ProfileView userId={userId} />
        </Suspense>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
