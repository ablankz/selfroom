import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { RequestFilter } from '../request';
import EmptyContent from '@/components/empty-content';
import { useResponsive } from '@/hooks/use-responsive';
import { RequestParamRegister } from './request-param-register';
import { RequestParamTable } from './request-param-table';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { endpointMatch } from '@/utils/rawAxios';
import { useSnackbar } from '@/components/snackbar';

type Props = {
  filters: RequestFilter;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
};

type Param = {
  key: string;
  value: string;
};

export const RequestParams = ({ filters, setFilters }: Props) => {
  const isDesktop = useResponsive('up', 'md');
  const paramKeys = useMemo(() => Object.keys(filters.param), [filters.param]);
  const [targetParam, setTargetParam] = useState<Param | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleComplete = () => {
    const matchPoint = endpointMatch(filters.method, filters.name);
    if (!matchPoint) {
      enqueueSnackbar({
        variant: 'error',
        message: 'パターンの一致するエンドポイントが見つかりません',
      });
      return;
    }
    setFilters((prev) => ({
      ...prev,
      param: matchPoint.defaultParam || {},
    }));
    if (!Object.keys(matchPoint.defaultParam || {}).length) {
      enqueueSnackbar({
        variant: 'warning',
        message: `補完できるparamがありません`,
      });
      return;
    }
    enqueueSnackbar({
      variant: 'success',
      message: `${matchPoint.urlKey}でのparam補完に成功しました`,
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Query Params
        <Tooltip title="Complete Test Param">
          <IconButton color="primary" onClick={handleComplete}>
            <AddCircleOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Box
        padding={2}
        textAlign={paramKeys.length !== 0 ? 'inherit' : 'center'}
        sx={{
          boxShadow: 2,
        }}
      >
        {paramKeys.length !== 0 ? (
          <>
            <RequestParamTable
              params={filters.param}
              setFilters={setFilters}
              handleOpen={handleOpen}
              setTargetParam={setTargetParam}
            />
          </>
        ) : (
          <>
            <EmptyContent
              title="NoItem"
              description={
                isDesktop ? '登録されたクエリパラムがありません' : ''
              }
              sx={{
                borderRadius: 1.5,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
              }}
              onClick={handleOpen}
            >
              パラム追加
            </Button>
          </>
        )}
        <RequestParamRegister
          open={open}
          onClose={handleClose}
          setFilters={setFilters}
          filters={filters}
          targetParam={targetParam}
          setTargetParam={setTargetParam}
        />
      </Box>
    </Box>
  );
};
