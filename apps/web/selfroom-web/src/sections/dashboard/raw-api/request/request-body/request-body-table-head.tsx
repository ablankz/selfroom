import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { ChangeEvent } from 'react';

type Props = {
  paramKeys: string[];
  selected: string[];
  handleSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RequestBodyTableHead = ({
  paramKeys,
  selected,
  handleSelectAll,
}: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={
              paramKeys.length > 0 && paramKeys.length === selected.length
            }
            onChange={handleSelectAll}
          />
        </TableCell>
        <TableCell align='center'>Key</TableCell>
        <TableCell align='center'>Value</TableCell>
        <TableCell width={40} />
      </TableRow>
    </TableHead>
  );
};
