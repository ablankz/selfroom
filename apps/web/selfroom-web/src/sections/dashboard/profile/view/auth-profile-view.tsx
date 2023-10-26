import { useState, useCallback, Suspense, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
// routes
import { paths } from '@/routes/paths';
// components
import Iconify from '@/components/iconify';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
// import ProfileGallery from '../profile-gallery';
import { useLocales } from '@/locales';
import { useGetUserQuery } from '@/api/users/useGetUserQuery';
import { MotionContainer, varBounce } from '@/components/animate';
import { Button, Typography } from '@mui/material';
import { PageNotFoundIllustration } from '@/assets/illustrations';
import ProfileFollowers from '../profile-followers';
import ProfileFollows from '../profile-follows';
import { useRouter } from '@/routes/hooks';
import ProfileFavorites from '../profile-favorites';
import { MiniCardListSkelton } from '@/sections/_common/skelton/mini-card-list-skelton';
import { RectangleCardListSkelton } from '@/sections/_common/skelton/rectangle-card-list-skelton';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'followers',
    label: 'Followers',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'follows',
    label: 'Follows',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'favorites',
    label: 'Favorites',
    icon: <Iconify icon="ic:baseline-meeting-room" width={24} />,
  },
];

type Props = {
  userId: string;
};

// ----------------------------------------------------------------------

export default function ProfileView({ userId }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const { data, refetch } = useGetUserQuery(userId);
  const [dispatch, setDispatch] = useState(false);
  const [followDispatch, setFollowDispatch] = useState(false);
  const [followerDispatch, setFollowerDispatch] = useState(false);

  useEffect(() => {
    if (dispatch) {
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

  const [currentTab, setCurrentTab] = useState('profile');
  const router = useRouter();

  const handleChangeTab = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

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
              Sorry, User not found!
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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('Profile')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Profile') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 320,
        }}
      >
        <ProfileCover
          user={data.data}
          setDispatch={setDispatch}
          setFollowDispatch={setFollowDispatch}
          setFollowerDispatch={setFollowerDispatch}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && <ProfileHome user={data.data} />}

      {currentTab === 'followers' && (
        <>
          <Typography variant="h4" sx={{ my: 5 }}>
            Followers
          </Typography>
          <Suspense fallback={<MiniCardListSkelton skeltonCount={6} />}>
            <ProfileFollowers
              userId={userId}
              setDispatch={setDispatch}
              followerDispatch={followerDispatch}
              setFollowerDispatch={setFollowerDispatch}
            />
          </Suspense>
        </>
      )}

      {currentTab === 'follows' && (
        <>
          <Typography variant="h4" sx={{ my: 5 }}>
            Follows
          </Typography>
          <Suspense fallback={<MiniCardListSkelton skeltonCount={6} />}>
            <ProfileFollows
              userId={userId}
              setDispatch={setDispatch}
              followDispatch={followDispatch}
              setFollowDispatch={setFollowDispatch}
            />
          </Suspense>
        </>
      )}

      {currentTab === 'favorites' && (
        <>
          <Typography variant="h4" sx={{ my: 5 }}>
            Favorites
          </Typography>
          <Suspense fallback={<RectangleCardListSkelton skeltonCount={6} />}>
            <ProfileFavorites userId={userId} setDispatch={setDispatch} />
          </Suspense>
        </>
      )}
    </Container>
  );
}
