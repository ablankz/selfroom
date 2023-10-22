// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { HEADER, NAV } from '@/layouts/config-layout';
import { useResponsive } from '@/hooks/use-responsive';
import { Box } from '@mui/material';
import { useOffSetTop } from '@/hooks/use-off-set-top';
import { LinkCard } from '../link-card';
import { Canvas } from '../three-canvas/canvas';
import { SPACING } from '@/layouts/dashboard/main';

type Link = {
  id: number;
  title: string;
  description: string;
  link: string;
  svg: string;
};

// ----------------------------------------------------------------------

export default function LinkView() {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const upLg = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);
  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';

  const offsetTop = offset && !isNavHorizontal;

  const StyledCanvasMain = styled(Container)`
    z-index: -1;
  `;
  const StyledSection = styled(Box)`
    padding: 1.2rem;
    font-size: 4rem;
    height: 100%;
    display: flex;
    align-items: center;
  `;

  const canvasTop = useMemo(() => {
    if (isNavHorizontal || offsetTop) return HEADER.H_DESKTOP_OFFSET;
    if (upLg) return HEADER.H_DESKTOP;
    return HEADER.H_MOBILE;
  }, [settings.themeLayout, upLg]);

  const canvasLeft = useMemo(() => {
    if (isNavHorizontal || !upLg) return 0;
    if (isNavMini) return NAV.W_MINI;
    return NAV.W_VERTICAL;
  }, [settings.themeLayout, upLg]);

  const [links, setLinks] = useState<Link[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    import(`../../../../assets/data/link/${currentLang.value}.ts`)
      .then((module) => {
        if (!module.default) throw new Error();
        setLinks(module.default);
      })
      .catch((_) => {
        setLinks([]);
        enqueueSnackbar({
          message: `${t('Failed to retrieve file')}`,
          variant: 'error',
        });
      });
  }, [currentLang]);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        height: { xs: '100%', lg: `calc(100% - ${canvasTop}px)` },
        maxHeight: `calc(100vh - ${canvasTop + SPACING * 2}px)`,
        overflow: { xs: 'hidden', md: 'visible' },
        alignItems: 'center',
      }}
    >
      <CustomBreadcrumbs
        heading={t('Link')}
        links={[
          { name: t('Portfolio'), href: paths.dashboard.root },
          { name: t('Link') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <StyledCanvasMain
        sx={{
          top: canvasTop,
          left: canvasLeft,
          height: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.900' : 'grey.400',
          borderRadius: 6,
        }}
      >
        <Canvas
          canvasTop={canvasTop + (isNavHorizontal ? 200 : 100)}
          canvasLeft={canvasLeft}
        />

        <StyledSection>
          <LinkCard items={links} />
        </StyledSection>
      </StyledCanvasMain>
    </Container>
  );
}
