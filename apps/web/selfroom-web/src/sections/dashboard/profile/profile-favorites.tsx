// @mui
import Box from '@mui/material/Box';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocales } from '@/locales';
import { Pagination, paginationClasses } from '@mui/material';
import EmptyContent from '@/components/empty-content';
import { useGetFavoritesQuery } from '@/api/favorites/useGetFavoritesQuery';
import { RoomCard } from '@/components/application/room-card';

// ----------------------------------------------------------------------

const PER_PAGE = 6;

type Props = {
  userId: string;
  setDispatch: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileFavorites({ userId, setDispatch }: Props) {
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
      <FavoriteTable
        userId={userId}
        page={page}
        setDispatch={setDispatch}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        resetPage={resetPage}
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
  page: number;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  resetPage: () => void;
};

function FavoriteTable({
  userId,
  page,
  setDispatch,
  totalCount,
  setTotalCount,
  resetPage,
}: TableProps) {
  const { data, refetch } = useGetFavoritesQuery(userId, page, PER_PAGE);
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

  const handleSuccess = useCallback(() => {
    setDispatch(true);
    refetch();
  }, []);

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
          {data?.data.data.map((favorite) => (
            <RoomCard
              handleSuccess={handleSuccess}
              key={favorite.chatRoomId}
              chatRoom={favorite}
            />
          ))}
        </Box>
      ) : (
        <EmptyContent
          title="NoItem"
          description={t('Not one of favorite rooms')}
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
