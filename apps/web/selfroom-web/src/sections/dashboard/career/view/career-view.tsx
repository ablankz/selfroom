// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Paper, Typography, alpha } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import {
  MotionViewport,
  varFade,
  varZoom,
} from '@/components/animate';
import { m } from 'framer-motion';
import MainHaeder from '../../_common/header/main-header';

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'inherit'
    | 'grey'
    | 'secondary';
  icon: React.ReactElement;
};

// ----------------------------------------------------------------------

export default function CareerView() {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const [timelines, setTimelines] = useState<TimelineType[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    import(`../../../../assets/data/timelines/${currentLang.value}`)
      .then((module) => {
        if (!module.default) throw new Error();
        setTimelines(module.default);
      })
      .catch((_) => {
        setTimelines([]);
        enqueueSnackbar({
          message: `${t('Failed to retrieve file')}`,
          variant: 'error',
        });
      });
  }, [currentLang]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Career')}
        links={[
          { name: t('Portfolio'), href: paths.dashboard.root },
          { name: t('Career') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <MainHaeder title='CAREER' description='career-description' />
      <Timeline
        position="alternate"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: { xs: 0.2, md: 1 },
          },
        }}
      >
        {timelines.map((item) => (
          <TimelineItem key={item.key} className='hover-scale hover-scale-sm'>
            <TimelineOppositeContent>
              <MotionViewport disableAnimatedMobile={false}>
                <m.div variants={varFade().in}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.time}
                  </Typography>
                </m.div>
              </MotionViewport>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={item.color}>{item.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <MotionViewport disableAnimatedMobile={false}>
                <m.div variants={varZoom().in}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      boxShadow: (theme) => theme.customShadows.primary
                    }}
                  >
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {item.des}
                    </Typography>
                  </Paper>
                </m.div>
              </MotionViewport>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}
