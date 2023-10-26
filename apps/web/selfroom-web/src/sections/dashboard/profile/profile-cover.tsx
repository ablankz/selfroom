// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, alpha } from '@mui/material/styles';
// theme
import { bgGradient } from '@/theme/css';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { uuidHash } from '@/utils/uuid-hash';
import { HOST_ASSET } from '@/config-global';
import { Button, IconButton, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import { useUserFollowQuery } from '@/api/follows/useUserFollowQuery';
import { useUserFollowCancelQuery } from '@/api/follows/useUserFollowCancelQuery';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import { UserData } from '@/types/response/user/user-response';
import { useAuthContext } from '@/auth/hooks';
import Iconify from '@/components/iconify';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

type Props = {
  user: UserData;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  setFollowDispatch: Dispatch<SetStateAction<boolean>>;
  setFollowerDispatch: Dispatch<SetStateAction<boolean>>;
};

// ----------------------------------------------------------------------

export default function ProfileCover({
  user,
  setDispatch,
  setFollowDispatch,
  setFollowerDispatch,
}: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { user: auth } = useAuthContext();
  const { mutate: follow, status: followStatus } = useUserFollowQuery(
    user.userId
  );
  const { mutate: followCancel, status: cancelStatus } =
    useUserFollowCancelQuery(user.userId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const handleFollow = () => {
    if (user.isFollow) followCancel();
    else follow();
  };

  const { copy } = useCopyToClipboard();

  const onCopy = useCallback(async () => {
    if (await copy(user.userId)) {
      enqueueSnackbar({
        message: t('copied'),
        variant: 'success',
      });
    } else {
      enqueueSnackbar({
        message: t('failed-copy'),
        variant: 'error',
      });
    }
  }, [copy, enqueueSnackbar]);

  useEffect(() => {
    if (followStatus === 'success') {
      setDispatch(true);
      enqueueSnackbar({
        message: t('Successfully followed up'),
        variant: 'success',
      });
      setFollowDispatch(true);
      setFollowerDispatch(true);
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
      setFollowDispatch(true);
      setFollowerDispatch(true);
    } else if (cancelStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed unfollow'),
        variant: 'error',
      });
    }
  }, [cancelStatus]);

  const imgUrl: string = useMemo(() => {
    const index = uuidHash(user.userId, 0, 39);
    return `${HOST_ASSET}/images/cover/cover_${index}.jpg`;
  }, [user]);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
          width: 1,
          pointerEvents: 'none',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Avatar
            src={user?.profilePhotoUrl || undefined}
            alt={user.nickname}
            sx={{
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: `solid 2px ${theme.palette.common.white}`,
            }}
          />

          <ListItemText
            sx={{
              mt: 3,
              ml: { md: 3 },
              textAlign: { xs: 'center', md: 'unset' },
            }}
            primary={user.nickname}
            secondary={
              <Typography
                fontSize={{ xs: 12, md: 16 }}
                onClick={() => onCopy()}
                sx={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
                color={'text.disabled'}
              >
                {user.userId}
                <IconButton>
                  <Iconify icon="eva:copy-fill" width={24} />
                </IconButton>
              </Typography>
            }
            primaryTypographyProps={{
              typography: 'h4',
            }}
            secondaryTypographyProps={{
              mt: 0.5,
              color: 'inherit',
              component: 'span',
              typography: 'body2',
              sx: { opacity: 0.48 },
            }}
          />
        </Stack>
        <Box px={8} display="flex" justifyContent="center" alignItems="center">
          {user.userId === auth?.userId ? (
            <Button
              onClick={() => router.push(paths.dashboard.setting)}
              variant="contained"
              size="medium"
              color="primary"
              sx={{ flexShrink: 0, ml: 1.5, pointerEvents: 'auto' }}
            >
              {'Setting'}
            </Button>
          ) : (
            <LoadingButton
              loading={followStatus === 'loading' || cancelStatus === 'loading'}
              disabled={
                followStatus === 'loading' || cancelStatus === 'loading'
              }
              size="medium"
              variant={user.isFollow ? 'soft' : 'outlined'}
              color={user.isFollow ? 'success' : 'inherit'}
              startIcon={
                user.isFollow ? (
                  <Iconify
                    width={18}
                    icon="eva:checkmark-fill"
                    sx={{ mr: -0.75 }}
                  />
                ) : null
              }
              onClick={handleFollow}
              sx={{ flexShrink: 0, ml: 1.5, pointerEvents: 'auto' }}
            >
              {user.isFollow ? 'Followed' : 'Follow'}
            </LoadingButton>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
