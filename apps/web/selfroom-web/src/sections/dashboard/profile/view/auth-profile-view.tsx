import { useState, useCallback } from 'react';
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
// import ProfileFriends from '../profile-friends';
// import ProfileGallery from '../profile-gallery';
// import ProfileFollowers from '../profile-followers';
import { useLocales } from '@/locales';
import { useGetUserQuery } from '@/api/users/useGetUserQuery';
import { NotFoundView } from '@/sections/error';
import { MotionContainer, varBounce } from '@/components/animate';
import { Button, Typography } from '@mui/material';
import { PageNotFoundIllustration } from '@/assets/illustrations';
import { RouterLink } from '@/routes/components';
import { User } from '@/types/entity';

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
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'friends',
    label: 'Friends',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

type Props = {
  userId: string;
};

// ----------------------------------------------------------------------

export default function ProfileView({ userId }: Props) {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const { data, status } = useGetUserQuery(userId);

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const handleSearchFriends = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchFriends(event.target.value);
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
            component={RouterLink}
            sx={{
              maxWidth: '10rem',
            }}
            href="/"
            size="large"
            variant="contained"
          >
            {t('Go to Home')}
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
          height: 290,
        }}
      >
        <ProfileCover user={data.data} />

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

      {currentTab === 'profile' && <ProfileHome />}

      {currentTab === 'followers' && (
        // <ProfileFollowers followers={_userFollowers} />
        <h1>followers</h1>
      )}

      {currentTab === 'friends' && (
        // <ProfileFriends
        //   friends={_userFriends}
        //   searchFriends={searchFriends}
        //   onSearchFriends={handleSearchFriends}
        // />
        <h1>friends</h1>
      )}

      {currentTab === 'gallery' && (
        // <ProfileGallery gallery={_userGallery} />
        <h1>gallery</h1>
      )}
    </Container>
  );
}
