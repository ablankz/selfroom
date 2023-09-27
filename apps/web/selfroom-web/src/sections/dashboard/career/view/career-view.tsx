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
    import(`../timelines/${currentLang.value}`)
      .then((module) => {
        setTimelines(module.default);
      })
      .catch((_) => {
        setTimelines([]);
        enqueueSnackbar({
          message: 'ファイルの取得に失敗しました',
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
      <Timeline
        position="alternate"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: {xs: 0.2, md: 1},
          },
        }}
      >
        {timelines.map((item) => (
          <TimelineItem key={item.key}>
            <TimelineOppositeContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={item.color}>{item.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                }}
              >
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.des}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}
