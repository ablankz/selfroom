import { useGetVisitorsQuery } from '@/api/room-visits/useGetVisitorsQuery';
import EmptyContent from '@/components/empty-content';
import Scrollbar from '@/components/scrollbar';
import { TablePaginationCustom } from '@/components/table';
import { useLocales } from '@/locales';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { fDateTime } from '@/utils/format-time';
import {
  Container,
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
  chatRoomId: string;
};

export const VisitorsLog = ({ chatRoomId }: Props) => {
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
    <Container
      sx={{
        width: 0.9,
        mt: 3,
        boxShadow: (theme) => theme.customShadows.z24,
      }}
    >
      {typeof totalCount === 'undefined' || totalCount !== 0 ? (
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <VisitorsTable
              chatRoomId={chatRoomId}
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
    </Container>
  );
};

type HistoryProps = {
  chatRoomId: string;
  page: number;
  perPage: number;
  setTotalCount: Dispatch<SetStateAction<number | undefined>>;
  resetPage: () => void;
};

const VisitorsTable = ({
  chatRoomId,
  page,
  perPage,
  setTotalCount,
  resetPage,
}: HistoryProps) => {
  const { data, refetch } = useGetVisitorsQuery(chatRoomId, page, perPage);
  const { t, currentLang } = useLocales();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [page, perPage]);

  useEffect(() => {
    refetch();
    resetPage();
  }, [chatRoomId]);

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
          <TableCell>{t('User Name')}</TableCell>
          <TableCell>{t('User ID')}</TableCell>
          <TableCell>{t('Visited Date')}</TableCell>
          <TableCell>{t('Left Date')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.data.data.map((user, index) => (
          <TableRow
            key={`${user.userId}.${index}`}
            sx={{
              cursor: 'pointer',
              ':hover': {
                bgcolor: (theme) =>
                  alpha(theme.palette.background.neutral, 0.5),
              },
            }}
            onClick={() => router.push(paths.dashboard.profile(user.userId))}
          >
            <TableCell>
              <Typography color="text.secondary" variant="body2">
                {user.nickname}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="text.disabled" variant="caption" fontSize={12}>
                {user.userId}
              </Typography>
            </TableCell>
            <TableCell>
              {fDateTime(user.visitedAt, 'MMM dd HH:mm', currentLang.value)}
            </TableCell>
            <TableCell>
              {fDateTime(user.leftAt, 'MMM dd HH:mm', currentLang.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
