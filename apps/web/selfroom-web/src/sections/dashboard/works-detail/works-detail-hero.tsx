// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// theme
import { bgGradient } from '@/theme/css';
// components
import { Work, isTeamWork } from '@/pages/dashboard/works-detail';
import { ListItemText, SpeedDial, SpeedDialAction, Stack } from '@mui/material';
import Iconify from '@/components/iconify';
import { useResponsive } from '@/hooks/use-responsive';
import SvgColor from '@/components/svg-color';
import { HOST, HOST_ASSET } from '@/config-global';
import { useLocales } from '@/locales';
import {
  FacebookShareButton,
  EmailShareButton,
  LineShareButton,
  TwitterShareButton,
} from 'react-share';
import { useMemo } from 'react';
import { paths } from '@/routes/paths';

type Props = {
  work: Work;
};

// ----------------------------------------------------------------------

export default function WorksDetailHero({ work }: Props) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  const { t } = useLocales();
  const sendMsg = useMemo(
    () => ({
      url: `${HOST}/${paths.dashboard.work(work.id)}`,
      mailtitle: t('mail-title'),
      title: `${t('works-share-1', {
        title: work.title,
      })}\n\n${work.description}\n`,
    }),
    [t]
  );

  return (
    <Box
      sx={{
        height: 480,
        overflow: 'hidden',
        ...bgGradient({
          imgUrl: work.coverUrl,
          startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
          endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
        }),
      }}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            color: 'common.white',
            position: 'absolute',
            maxWidth: 480,
            pt: { xs: 2, md: 8 },
          }}
        >
          {work.title}
        </Typography>
        <Stack
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              px: { xs: 2, md: 3 },
              pb: { xs: 3, md: 8 },
            }}
          >
            {isTeamWork(work) ? (
              <>
                <Box
                  component="img"
                  src={work.devImg}
                  alt={work.devName}
                  sx={{
                    display: 'inline-block',
                    width: 64,
                    height: 64,
                    mr: 2,
                  }}
                />

                <ListItemText
                  sx={{ color: 'common.white' }}
                  primary={work.devName}
                  secondary={`${work.startTime || ''} - ${work.endTime || ''}`}
                  primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                  secondaryTypographyProps={{
                    color: 'inherit',
                    sx: { opacity: 0.64 },
                  }}
                />
              </>
            ) : (
              <>
                <SvgColor
                  src={`${HOST_ASSET}/icons/works/me.svg`}
                  color={(t) => t.palette.primary.main}
                  sx={{
                    display: 'inline-block',
                    width: 64,
                    height: 64,
                    mr: 2,
                  }}
                />

                <ListItemText
                  sx={{ color: 'common.white' }}
                  primary={t('Personal Development')}
                  secondary={`${work.startTime || ''} - ${work.endTime || ''}`}
                  primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                  secondaryTypographyProps={{
                    color: 'inherit',
                    sx: { opacity: 0.64 },
                  }}
                />
              </>
            )}
          </Stack>

          <SpeedDial
            direction={smUp ? 'left' : 'up'}
            ariaLabel="Share works"
            icon={<Iconify icon="solar:share-bold" />}
            FabProps={{ size: 'medium' }}
            sx={{
              position: 'absolute',
              bottom: { xs: 32, md: 64 },
              right: { xs: 16, md: 24 },
            }}
          >
            <SpeedDialAction
              key="facebook"
              icon={
                <FacebookShareButton url={sendMsg.url} quote={sendMsg.title}>
                  <Iconify icon="ic:baseline-facebook" color="#4267B2" />
                </FacebookShareButton>
              }
              tooltipTitle="Facebook"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
            <SpeedDialAction
              key="twitter"
              icon={
                <TwitterShareButton {...sendMsg}>
                  <Iconify icon="fa6-brands:x-twitter" color="#000000" />
                </TwitterShareButton>
              }
              tooltipTitle="&#x1D54F;(Twitter)"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
            <SpeedDialAction
              key="line"
              icon={
                <LineShareButton {...sendMsg} i18nIsDynamicList>
                  <Iconify icon="bi:line" color="#00B900" />
                </LineShareButton>
              }
              tooltipTitle="Line"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
            <SpeedDialAction
              key="email"
              icon={
                <EmailShareButton
                  url={sendMsg.url}
                  subject={sendMsg.mailtitle}
                  body={sendMsg.title}
                >
                  <Iconify icon="ic:baseline-email" />
                </EmailShareButton>
              }
              tooltipTitle="Email"
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          </SpeedDial>
        </Stack>
      </Container>
    </Box>
  );
}
