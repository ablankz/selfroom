// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from '@/components/iconify';
import { UserFollowerData } from '@/types/response/user/user-followers-response';
import { useGetFollowersQuery } from '@/api/follows/useGetFollowersQuery';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useUserFollowQuery } from '@/api/follows/useUserFollowQuery';
import { useUserFollowCancelQuery } from '@/api/follows/useUserFollowCancelQuery';
import { useAuthContext } from '@/auth/hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import { Button } from '@mui/material';
import EmptyContent from '@/components/empty-content';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>
};

export default function ProfileFollowers({ userId, setDispatch }: Props) {
  const { data, refetch } = useGetFollowersQuery(userId);
  const { user } = useAuthContext();
  const { t } = useLocales();

  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <>
      {data?.data && !!data.data.length ? (
        <>
          <Typography variant="h4" sx={{ my: 5 }}>
            Followers
          </Typography>

          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
          >
            {data?.data.map((follower) => (
              <FollowerItem
                setDispatch={setDispatch}
                key={follower.userId}
                follower={follower}
                authId={user?.userId || user?.adminId || ''}
              />
            ))}
          </Box>
        </>
      ) : (
        <EmptyContent
          title="NoItem"
          description={t('Not a single follower')}
          sx={{
            borderRadius: 1.5,
            height: 200,
          }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FollowerItemProps = {
  follower: UserFollowerData;
  authId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>
};

function FollowerItem({ follower, authId, setDispatch }: FollowerItemProps) {
  const { nickname, userId, profilePhotoUrl, isFollow } = follower;
  const router = useRouter();
  const { mutate: follow, status: followStatus } = useUserFollowQuery(userId);
  const { mutate: followCancel, status: cancelStatus } =
    useUserFollowCancelQuery(userId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const handleFollow = () => {
    if (isFollow) followCancel();
    else follow();
  };

  useEffect(() => {
    if (followStatus === 'success') {
      setDispatch(true);
      enqueueSnackbar({
        message: t('Successfully followed up'),
        variant: 'success',
      });
    } else if (cancelStatus === 'success') {
      setDispatch(true);
      enqueueSnackbar({
        message: t('Successfully unfollowed'),
        variant: 'success',
      });
    } else if (followStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed follow up'),
        variant: 'success',
      });
    } else if (cancelStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed unfollow'),
        variant: 'success',
      });
    }
  }, [followStatus, cancelStatus]);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Avatar
        alt={nickname}
        src={profilePhotoUrl || undefined}
        sx={{ width: 48, height: 48, mr: 2 }}
      />

      <ListItemText
        primary={nickname}
        secondary={userId}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => router.push(paths.dashboard.profile(userId))}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      {userId === authId ? (
        <Button
          onClick={() => router.push(paths.dashboard.setting)}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ flexShrink: 0, ml: 1.5 }}
        >
          {'Setting'}
        </Button>
      ) : (
        <LoadingButton
          loading={followStatus === 'loading' || cancelStatus === 'loading'}
          size="small"
          variant={isFollow ? 'text' : 'outlined'}
          color={isFollow ? 'success' : 'inherit'}
          startIcon={
            isFollow ? (
              <Iconify
                width={18}
                icon="eva:checkmark-fill"
                sx={{ mr: -0.75 }}
              />
            ) : null
          }
          onClick={handleFollow}
          sx={{ flexShrink: 0, ml: 1.5 }}
        >
          {isFollow ? 'Followed' : 'Follow'}
        </LoadingButton>
      )}
    </Card>
  );
}
