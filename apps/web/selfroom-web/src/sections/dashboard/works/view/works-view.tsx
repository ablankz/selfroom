// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import CarouselAnimation from '../carousel-animation';
import WorkImages from '../work-images';
import { useResponsive } from '@/hooks/use-responsive';
import MainHaeder from '../../_common/header/main-header';

type Work = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

// ----------------------------------------------------------------------

export default function WorksView() {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const [works, setWorks] = useState<Work[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    import(`../../../../assets/data/works/${currentLang.value}.ts`)
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
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Works')}
        links={[
          { name: t('Portfolio'), href: paths.dashboard.root },
          { name: t('Works') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <MainHaeder title="WORKS" description="works-description" />
      {upLg ? (
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CarouselAnimation data={works} />
          </CardContent>
        </Card>
      ) : (
        <WorkImages data={works}/>
      )}
    </Container>
  );
}
