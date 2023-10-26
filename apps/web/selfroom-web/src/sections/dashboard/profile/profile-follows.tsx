// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from '@/components/iconify';
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
import { useGetFolloweesQuery } from '@/api/follows/useGetFolloweesQuery';
import {
  UserFolloweeData,
  UserFolloweesResponse,
} from '@/types/response/user/user-followees-response';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';

// ----------------------------------------------------------------------

const PER_PAGE = 9;

type Props = {
  userId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  followDispatch: boolean;
  setFollowDispatch: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileFollows({
  userId,
  setDispatch,
  followDispatch,
  setFollowDispatch,
}: Props) {
  const { user } = useAuthContext();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);

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
      <FolloweeTable
        authId={user?.userId || user?.adminId || ''}
        userId={userId}
        page={page}
        setDispatch={setDispatch}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        resetPage={resetPage}
        followDispatch={followDispatch}
        setFollowDispatch={setFollowDispatch}
      />
      {!!totalCount && (
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
      )}
    </>
  );
}

type TableProps = {
  userId: string;
  authId: string;
  page: number;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  resetPage: () => void;
  followDispatch: boolean;
  setFollowDispatch: Dispatch<SetStateAction<boolean>>;
};

function FolloweeTable({
  userId,
  authId,
  page,
  setDispatch,
  totalCount,
  setTotalCount,
  resetPage,
  followDispatch,
  setFollowDispatch,
}: TableProps) {
  const { data, refetch } = useGetFolloweesQuery(userId, page, PER_PAGE);
  const { t } = useLocales();

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

  useEffect(() => {
    if (followDispatch) {
      refetch();
      setFollowDispatch(false);
    }
  }, [followDispatch]);

  return (
    <>
      {!!totalCount ? (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {data?.data.data.map((followee) => (
            <FolloweeItem
              followeesRefetch={refetch}
              setDispatch={setDispatch}
              key={followee.userId}
              followee={followee}
              authId={authId}
            />
          ))}
        </Box>
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
  followeesRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<UserFolloweesResponse, unknown>>;
};

function FolloweeItem({
  followee,
  authId,
  setDispatch,
  followeesRefetch,
}: FolloweeItemProps) {
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
      followeesRefetch();
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
      followeesRefetch();
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
