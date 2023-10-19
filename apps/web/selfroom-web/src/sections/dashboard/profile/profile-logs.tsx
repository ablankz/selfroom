import { useGetVisitRoomsQuery } from '@/api/room-visits/useGetVisitRoomsQuery';
import EmptyContent from '@/components/empty-content';
import Scrollbar from '@/components/scrollbar';
import { TablePaginationCustom } from '@/components/table';
import { useLocales } from '@/locales';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { fDateTime } from '@/utils/format-time';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type Props = {
  userId: string;
};

export const ProfileLogs = ({ userId }: Props) => {
  const { t } = useLocales();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  const onChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage + 1);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setPerPage(parseInt(event.target.value, 10));
    },
    []
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  return (
    <Card>
      <CardHeader title={t('Visit Log')} />
      <CardContent>
        {typeof totalCount === 'undefined' || totalCount !== 0 ? (
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <HistoryTable
                userId={userId}
                page={page}
                perPage={perPage}
                setTotalCount={setTotalCount}
                resetPage={resetPage}
              />
              <TablePaginationCustom
                component="div"
                count={totalCount || 0}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                page={page - 1}
                rowsPerPage={perPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Scrollbar>
          </TableContainer>
        ) : (
          <EmptyContent
            title="NoItem"
            description={t('No visit history')}
            sx={{
              borderRadius: 1.5,
              height: 300,
              boxShadow: (theme) => theme.customShadows.error,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

type HistoryProps = {
  userId: string;
  page: number;
  perPage: number;
  setTotalCount: Dispatch<SetStateAction<number | undefined>>;
  resetPage: () => void;
};

function HistoryTable({
  userId,
  page,
  perPage,
  setTotalCount,
  resetPage,
}: HistoryProps) {
  const { data, refetch } = useGetVisitRoomsQuery(userId, page, perPage);
  const { t, currentLang } = useLocales();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [page, perPage]);

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
    <Table sx={{ minWidth: 700 }}>
      <TableHead>
        <TableRow>
          <TableCell>{t('Room Name')}</TableCell>
          <TableCell>{t('Room ID')}</TableCell>
          <TableCell>{t('Visited Date')}</TableCell>
          <TableCell>{t('Left Date')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.data.data.map((room, index) => (
          <TableRow
            key={`${room.chatRoomId}.${index}`}
            sx={{
              cursor: 'pointer',
              ':hover': {
                bgcolor: (theme) => alpha(theme.palette.background.neutral, 0.5),
              },
            }}
            onClick={() => router.push(paths.dashboard.chatroom.profile(room.chatRoomId))}
          >
            <TableCell>
              <Typography color="text.secondary" variant="body2">
                {room.name}
              </Typography>
            </TableCell>
            <TableCell width={280}>
              <Typography color="text.disabled" variant="caption" fontSize={12}>
                {room.chatRoomId}
              </Typography>
            </TableCell>
            <TableCell width={130}>
              {fDateTime(room.visitedAt, 'MMM dd HH:mm', currentLang.value)}
            </TableCell>
            <TableCell width={130}>
              {fDateTime(room.leftAt, 'MMM dd HH:mm', currentLang.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
