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
import { HOST_ASSET } from '@/config-global';
import { useLocales } from '@/locales';

type Props = {
  work: Work;
};

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

// ----------------------------------------------------------------------

export default function WorksDetailHero({ work }: Props) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  const { t } = useLocales();

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
                  color={t => t.palette.primary.main}
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
            icon={<Iconify icon="lucide:external-link" />}
            FabProps={{ size: 'medium' }}
            sx={{
              position: 'absolute',
              bottom: { xs: 32, md: 64 },
              right: { xs: 16, md: 24 },
            }}
          >
            {_socials.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={
                  <Iconify icon={action.icon} sx={{ color: action.color }} />
                }
                tooltipTitle={action.name}
                tooltipPlacement="top"
                FabProps={{ color: 'default' }}
              />
            ))}
          </SpeedDial>
        </Stack>
      </Container>
    </Box>
  );
}
