// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from '@/components/iconify';
import {
  UserFollowerData,
  UserFollowersResponse,
} from '@/types/response/user/user-followers-response';
import { useGetFollowersQuery } from '@/api/follows/useGetFollowersQuery';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useUserFollowQuery } from '@/api/follows/useUserFollowQuery';
import { useUserFollowCancelQuery } from '@/api/follows/useUserFollowCancelQuery';
import { useAuthContext } from '@/auth/hooks';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import { Button, Pagination, paginationClasses } from '@mui/material';
import EmptyContent from '@/components/empty-content';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';

const PER_PAGE = 9;

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileFollowers({ userId, setDispatch }: Props) {
  const { user } = useAuthContext();
  const { t } = useLocales();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  const handlePageChange = useCallback(
    (_: ChangeEvent<unknown>, page: number) => {
      setPage(page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const pageCount = useMemo(
    () => Math.ceil((totalCount || 0) / PER_PAGE),
    [totalCount]
  );

  return (
    <>
      {typeof totalCount === 'undefined' || totalCount !== 0 ? (
        <>
          <Typography variant="h4" sx={{ my: 5 }}>
            Followers
          </Typography>
          <FollowerTable
            authId={user?.userId || user?.adminId || ''}
            userId={userId}
            page={page}
            setDispatch={setDispatch}
            setTotalCount={setTotalCount}
            resetPage={resetPage}
          />
          <Pagination
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
            count={pageCount}
            page={page}
            sx={{
              mt: 8,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: 'center',
              },
            }}
          />
        </>
      ) : (
        <EmptyContent
          title="NoItem"
          description={t('Not a single follower')}
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

type TableProps = {
  userId: string;
  authId: string;
  page: number;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  setTotalCount: Dispatch<SetStateAction<number | undefined>>;
  resetPage: () => void;
};

function FollowerTable({
  userId,
  authId,
  page,
  setDispatch,
  setTotalCount,
  resetPage,
}: TableProps) {
  const { data, refetch } = useGetFollowersQuery(userId, page, PER_PAGE);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    refetch();
    resetPage();
  }, [userId]);

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.totalCount);
    } else {
      setTotalCount(0);
    }
  }, [data]);

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {data?.data.data.map((follower) => (
        <FollowerItem
          followersRefetch={refetch}
          setDispatch={setDispatch}
          key={follower.userId}
          follower={follower}
          authId={authId}
        />
      ))}
    </Box>
  );
}

type FollowerItemProps = {
  follower: UserFollowerData;
  authId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  followersRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserFollowersResponse, unknown>>;
};

function FollowerItem({ follower, authId, setDispatch, followersRefetch }: FollowerItemProps) {
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
      followersRefetch();
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
      followersRefetch();
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
