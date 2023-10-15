// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from '@/components/iconify';
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
import { useGetFolloweesQuery } from '@/api/follows/useGetFolloweesQuery';
import { UserFolloweeData } from '@/types/response/user/user-followees-response';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileFollows({ userId, setDispatch }: Props) {
  const { data, refetch } = useGetFolloweesQuery(userId);
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
            Followees
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
            {data?.data.map((followee) => (
              <FolloweeItem
                setDispatch={setDispatch}
                key={followee.userId}
                followee={followee}
                authId={user?.userId || user?.adminId || ''}
              />
            ))}
          </Box>
        </>
      ) : (
        <EmptyContent
          title="NoItem"
          description={t('None of the users are currently being followed')}
          sx={{
            borderRadius: 1.5,
            height: 300,
            boxShadow: (theme) => theme.customShadows.error,
          }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FolloweeItemProps = {
  followee: UserFolloweeData;
  authId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
};

function FolloweeItem({ followee, authId, setDispatch }: FolloweeItemProps) {
  const { nickname, userId, profilePhotoUrl, isFollow } = followee;
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
    } else if (followStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed follow up'),
        variant: 'error',
      });
    }
  }, [followStatus]);

  useEffect(() => {
    if (cancelStatus === 'success') {
      setDispatch(true);
      enqueueSnackbar({
        message: t('Successfully unfollowed'),
        variant: 'success',
      });
    } else if (cancelStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed unfollow'),
        variant: 'error',
      });
    }
  }, [cancelStatus]);

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
