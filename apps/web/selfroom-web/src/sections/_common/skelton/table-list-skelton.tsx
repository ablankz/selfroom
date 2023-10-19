import { TableSkeleton } from '@/components/table';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRowProps,
} from '@mui/material';

interface Props extends TableRowProps {
  skeltonCount?: number;
}

export const TableListSkelton = ({ skeltonCount = 5, ...other }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {[...Array(skeltonCount)].map((_, index) => (
            <TableSkeleton key={index} sx={{ height: 60 }} {...other} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
