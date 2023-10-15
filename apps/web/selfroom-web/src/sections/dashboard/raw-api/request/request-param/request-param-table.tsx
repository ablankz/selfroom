import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RequestParam } from '../../view/raw-api-view';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { RequestFilter } from '../request';
import { useSnackbar } from '@/components/snackbar';
import { RequestParamTableHead } from './request-param-table-head';
import EditIcon from '@mui/icons-material/Edit';
import { useLocales } from '@/locales';

type Param = {
  key: string;
  value: string;
};

type Props = {
  params: RequestParam;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
  handleOpen: () => void;
  setTargetParam: Dispatch<SetStateAction<Param | undefined>>;
};

export const RequestParamTable = ({
  params,
  setFilters,
  handleOpen,
  setTargetParam,
}: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const paramKeys = useMemo(() => Object.keys(params), [params]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(paramKeys);
      return;
    }
    setSelected([]);
  };

  const handleCheck = (
    _: React.ChangeEvent<HTMLInputElement>,
    param: string
  ) => {
    const selectedIndex = selected.indexOf(param);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, param);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    setFilters((prev) => {
      const newParams = Object.fromEntries(
        Object.entries(prev.param).filter(([key]) => !selected.includes(key))
      );
      return {
        ...prev,
        param: newParams,
      };
    });
    enqueueSnackbar({
      message: t('PARAM removed'),
      variant: 'success',
    });
    setSelected([]);
  };

  const handleEdit = (key: string) => {
    setTargetParam({
      key,
      value: params[key],
    });
    handleOpen();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} m={1} mb={2} justifyContent="space-between">
        <IconButton
          onClick={handleDelete}
          disabled={selected.length === 0}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          {t('Add PARAM')}
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <RequestParamTableHead
            paramKeys={paramKeys}
            selected={selected}
            handleSelectAll={handleSelectAll}
          />
          <TableBody>
            {paramKeys.map((paramKey: string) => (
              <TableRow key={paramKey}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(paramKey) !== -1}
                    onChange={(e: any) => handleCheck(e, paramKey)}
                  />
                </TableCell>
                <TableCell align="center">{paramKey}</TableCell>
                <TableCell align="center">{params[paramKey]}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(paramKey)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
