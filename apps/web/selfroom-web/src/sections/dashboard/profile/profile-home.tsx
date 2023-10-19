// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// utils
import { fNumber } from '@/utils/format-number';
// components
import Iconify from '@/components/iconify';
//
import { ProfileLogs } from './profile-logs';
import { User } from '@/types/entity';
import { useLocales } from '@/locales';
import { Suspense } from 'react';
import { TableListSkelton } from '@/sections/_common/skelton/table-list-skelton';

// ----------------------------------------------------------------------

type Props = {
  user: User;
};

export default function ProfileHome({ user }: Props) {
  const { t } = useLocales();
  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        <Stack width={1}>
          {fNumber(user.followerNum)}
          <Box
            component="span"
            sx={{ color: 'text.secondary', typography: 'body2' }}
          >
            Follower
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(user.followNum)}
          <Box
            component="span"
            sx={{ color: 'text.secondary', typography: 'body2' }}
          >
            Following
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {user.description && (
          <Box sx={{ typography: 'body2', whiteSpace: 'pre-wrap' }}>
            {user.description}
          </Box>
        )}

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {user.country ? (
              <>
                {`Live at `}
                <Link variant="subtitle2" color="inherit">
                  {user.country}
                </Link>
              </>
            ) : (
              t('Unregistered information')
            )}
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {user.email || t('Unregistered information')}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {user.company && user.role ? (
              <>
                {user.role} {`at `}
                <Link variant="subtitle2" color="inherit">
                  {user.company}
                </Link>
              </>
            ) : (
              t('Unregistered information')
            )}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {user.school ? (
              <>
                {`Studied at `}
                <Link variant="subtitle2" color="inherit">
                  {user.school}
                </Link>
              </>
            ) : (
              t('Unregistered information')
            )}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <Suspense fallback={<TableListSkelton />}>
            <ProfileLogs userId={user.userId} />
          </Suspense>
        </Stack>
      </Grid>
    </Grid>
  );
}
