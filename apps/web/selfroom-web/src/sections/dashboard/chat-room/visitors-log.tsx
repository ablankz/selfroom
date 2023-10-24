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
  visitDispatch: boolean;
  setVisitDispatch: Dispatch<SetStateAction<boolean>>;
};

export const VisitorsLog = ({
  chatRoomId,
  visitDispatch,
  setVisitDispatch,
}: Props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState<number>(0);

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
        my: 3,
        boxShadow: (theme) => theme.customShadows.z24,
      }}
    >
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <VisitorsTable
            chatRoomId={chatRoomId}
            page={page}
            perPage={perPage}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            resetPage={resetPage}
            setVisitDispatch={setVisitDispatch}
            visitDispatch={visitDispatch}
          />
          {!!totalCount && (
            <TablePaginationCustom
              component="div"
              count={totalCount || 0}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              page={page - 1}
              rowsPerPage={perPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          )}
        </Scrollbar>
      </TableContainer>
    </Container>
  );
};

type HistoryProps = {
  chatRoomId: string;
  page: number;
  perPage: number;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  resetPage: () => void;
  visitDispatch: boolean;
  setVisitDispatch: Dispatch<SetStateAction<boolean>>;
};

const VisitorsTable = ({
  chatRoomId,
  page,
  perPage,
  totalCount,
  setTotalCount,
  resetPage,
  visitDispatch,
  setVisitDispatch,
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

  useEffect(() => {
    if (visitDispatch) {
      refetch();
      setVisitDispatch(false);
    }
  }, [visitDispatch]);

  return (
    <>
      {!!totalCount ? (
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
                onClick={() =>
                  router.push(paths.dashboard.profile(user.userId))
                }
              >
                <TableCell>
                  <Typography color="text.secondary" variant="body2">
                    {user.nickname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="text.disabled"
                    variant="caption"
                    fontSize={12}
                  >
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
    </>
  );
};
