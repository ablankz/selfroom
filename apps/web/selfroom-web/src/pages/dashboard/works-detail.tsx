import { useLocales } from '@/locales';
import { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '@/components/snackbar';
import { LoadingScreen } from '@/components/loading-screen';
import { WorksDetailView } from '@/sections/dashboard/works-detail/view';

export type Work = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  isPersonal: boolean;
  startTime?: string;
  endTime?: string;
  devImg?: string;
  devName?: string;
};

export type PersonalWork = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  isPersonal: boolean;
  startTime?: string;
  endTime?: string;
  devImg: string;
  devName: string;
}

export type TeamWork = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  isPersonal: boolean;
  startTime?: string;
  endTime?: string;
}

export function isTeamWork(work: PersonalWork | TeamWork): work is PersonalWork {
  return !work.isPersonal; 
}

// ----------------------------------------------------------------------

export default function WorksDetailPage() {
  const { t, currentLang } = useLocales();
  const [mainWork, setMainWork] = useState<Work | undefined>(undefined);
  const [works, setWorks] = useState<Work[]>([]);
  const { name } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(name){
      setMainWork(works.filter(work => work.id === name)[0]);
    }
  }, [name, works]);

  useEffect(() => {
    import(`../../assets/data/works/${currentLang.value}.ts`)
      .then((module) => {
        if (!module.default) throw new Error();
        setWorks(module.default);
      })
      .catch((_) => {
        setWorks([]);
        enqueueSnackbar({
          message: `${t('Failed to retrieve file')}`,
          variant: 'error',
        });
      });
  }, [currentLang]);

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Works')}{mainWork ? `: ${t(mainWork.title)}` : ''}</title>
      </Helmet>

      {mainWork ? (
        <Suspense fallback={<LoadingScreen />}>
          <WorksDetailView work={mainWork} key={mainWork.id}/>
        </Suspense>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
