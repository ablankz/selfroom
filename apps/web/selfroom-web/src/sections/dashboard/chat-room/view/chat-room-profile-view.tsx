// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import {
  Button,
  Card,
  Grid,
  Tab,
  Tabs,
  Typography,
  alpha,
} from '@mui/material';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useGetChatRoomQuery } from '@/api/chat-rooms/useGetChatRoomQuery';
import { MotionContainer, varBounce } from '@/components/animate';
import { m } from 'framer-motion';
import { PageNotFoundIllustration } from '@/assets/illustrations';
import { useRouter } from '@/routes/hooks';
import { RoomProfileImage } from '../room-profile-image';
import { RoomProfileDetail } from '../room-profile-detail';
import { VisitorsLog } from '../visitors-log';
import { TableListSkelton } from '@/sections/_common/skelton/table-list-skelton';
import { MiniCardListSkelton } from '@/sections/_common/skelton/mini-card-list-skelton';
import RoomFavors from '../room-favors';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'visitors',
    label: 'Visitors',
  },
  {
    value: 'favors',
    label: 'Favors',
  },
  // {
  //   value: 'analytics',
  //   label: 'Analytics',
  // },
];

type Props = {
  chatRoomId: string;
};

export default function ChatRoomProfileView({ chatRoomId }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const [currentTab, setCurrentTab] = useState('visitors');
  const { data, refetch } = useGetChatRoomQuery(chatRoomId);
  const [dispatch, setDispatch] = useState(false);
  const router = useRouter();
  const [visitDispatch, setVisitDispatch] = useState(false);
  const [favorDispatch, setFavorDispatch] = useState(false);

  const handleChangeTab = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  useEffect(() => {
    if (dispatch) {
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

  const handleSuccess = useCallback(() => {
    setDispatch(true);
    refetch();
  }, []);

  if (!data) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MotionContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Sorry, Chat Room not found!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              {t(
                "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Besure to check your spelling."
              )}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

          <Button
            sx={{
              maxWidth: '10rem',
            }}
            onClick={() => router.back()}
            size="large"
            variant="contained"
          >
            {t('Go Back')}
          </Button>
        </MotionContainer>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat'), href: paths.dashboard.chat },
          { name: t('Profile') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }} mb={3}>
        <Grid xs={12} md={6} lg={7} item>
          <RoomProfileImage
            data={data.data}
            handleSuccess={handleSuccess}
            setFavorDispatch={setFavorDispatch}
          />
        </Grid>

        <Grid xs={12} md={6} lg={5} item>
          <RoomProfileDetail
            data={data.data}
            handleSuccess={handleSuccess}
            setVisitDispatch={setVisitDispatch}
          />
        </Grid>
      </Grid>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'visitors' && (
          <Suspense fallback={<TableListSkelton />}>
            <VisitorsLog
              chatRoomId={chatRoomId}
              visitDispatch={visitDispatch}
              setVisitDispatch={setVisitDispatch}
            />
          </Suspense>
        )}

        {currentTab === 'favors' && (
          <Suspense fallback={<MiniCardListSkelton skeltonCount={6} />}>
            <RoomFavors
              chatRoomId={chatRoomId}
              setDispatch={setDispatch}
              setFavorDispatch={setFavorDispatch}
              favorDispatch={favorDispatch}
            />
          </Suspense>
        )}

        {/* {currentTab === 'analytics' && (
        )} */}
      </Card>
    </Container>
  );
}
