import {
  RoomFilter,
  RoomSort,
  useGetChatRoomsQuery,
} from '@/api/chat-rooms/useGetChatRoomsQuery';
import { RoomCard } from '@/components/application/room-card';
import EmptyContent from '@/components/empty-content';
import { useLocales } from '@/locales';
import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

type Props = {
  filters: RoomFilter;
  sort: RoomSort;
  page: number;
  perPage: number;
  dispatch: boolean;
  totalCount: number;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  resetPage: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const RoomQueryContainer = ({
  filters,
  sort,
  page,
  perPage,
  dispatch,
  totalCount,
  setDispatch,
  setTotalCount,
  resetPage,
  setIsLoading
}: Props) => {
  const { data, refetch, status } = useGetChatRoomsQuery(filters, sort, page, perPage);
  const { t } = useLocales();

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.totalCount);
    } else {
      setTotalCount(0);
    }
  }, [data]);

  useEffect(() => {
      setIsLoading(status === 'loading');
  }, [status]);

  const handleSuccess = useCallback(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (dispatch) {
      resetPage();
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

  if (!totalCount) {
    return (
      <EmptyContent
        title="NoItem"
        description={t('No matching rooms found')}
        sx={{
          borderRadius: 1.5,
          height: 300,
          boxShadow: (theme) => theme.customShadows.error,
        }}
      />
    );
  }

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
      {data?.data.data.map((room) => (
        <RoomCard
          handleSuccess={handleSuccess}
          key={room.chatRoomId}
          chatRoom={room}
        />
      ))}
    </Box>
  );
};
