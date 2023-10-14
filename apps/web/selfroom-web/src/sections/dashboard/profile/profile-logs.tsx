import Scrollbar from '@/components/scrollbar';
import { TablePaginationCustom } from '@/components/table';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const ProfileLogs = () => {
  return (
    <Card>
      <CardHeader title="Visit Log" />
      <CardContent>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Path</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {logs.map((log) => {
              const statusColor =
                log.status >= 200 && log.status < 300 ? 'success' : 'error';
              const createdAt = format(log.createdAt, 'yyyy/MM/dd HH:mm:ss');

              return (
                <TableRow key={log.id}>
                  <TableCell width="100">
                    <Typography color="text.secondary" variant="caption">
                      {log.method}
                    </Typography>
                  </TableCell>
                  <TableCell width="64">
                    <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>{log.route}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                </TableRow>
              );
            })} */}
              <TableRow>
                <TableCell width="100">
                  <Typography color="text.secondary" variant="caption">
                    room
                  </Typography>
                </TableCell>
                <TableCell width="64">
                  {/* <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill> */}
                  in
                </TableCell>
                <TableCell>ygj-ajkbjkb-bajkb-sgjg</TableCell>
                <TableCell>2023:02:20:222:22</TableCell>
              </TableRow>
              <TableRow>
                <TableCell width="100">
                  <Typography color="text.secondary" variant="caption">
                    room
                  </Typography>
                </TableCell>
                <TableCell width="64">
                  {/* <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill> */}
                  in
                </TableCell>
                <TableCell>ygj-ajkbjkb-bajkb-sgjg</TableCell>
                <TableCell>2023:02:20:222:22</TableCell>
              </TableRow>
              <TableRow>
                <TableCell width="100">
                  <Typography color="text.secondary" variant="caption">
                    room
                  </Typography>
                </TableCell>
                <TableCell width="64">
                  {/* <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill> */}
                  in
                </TableCell>
                <TableCell>ygj-ajkbjkb-bajkb-sgjg</TableCell>
                <TableCell>2023:02:20:222:22</TableCell>
                <TableCell>2023:02:20:222:22</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePaginationCustom
          component="div"
          count={3}
          onPageChange={(): void => {}}
          onRowsPerPageChange={(): void => {}}
          page={0}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardContent>
    </Card>
  );
};
