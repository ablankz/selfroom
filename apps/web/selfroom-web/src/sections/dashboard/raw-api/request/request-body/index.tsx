import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { RequestFilter } from '../request';
import EmptyContent from '@/components/empty-content';
import { useResponsive } from '@/hooks/use-responsive';
import { RequestBodyRegister } from './request-body-register';
import { RequestBodyTable } from './request-body-table';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { endpointMatch } from '@/utils/rawAxios';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';

type Props = {
  filters: RequestFilter;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
};

type Param = {
  key: string;
  value: string;
};

export const RequestBody = ({ filters, setFilters }: Props) => {
  const isDesktop = useResponsive('up', 'md');
  const paramKeys = useMemo(() => Object.keys(filters.body), [filters.body]);
  const [targetParam, setTargetParam] = useState<Param | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const handleComplete = () => {
    const matchPoint = endpointMatch(filters.method, filters.name);
    if (!matchPoint) {
      enqueueSnackbar({
        variant: 'error',
        message: t('No endpoint matching pattern found'),
      });
      return;
    }
    setFilters((prev) => ({
      ...prev,
      body: matchPoint.defaultBody || {},
    }));
    if(!(Object.keys(matchPoint.defaultBody || {}).length)){
      enqueueSnackbar({
        variant: 'warning',
        message: t(`There is no BODY that can complement`),
      });
      return;
    }
    enqueueSnackbar({
      variant: 'success',
      message: t(`Successful BODY completion`),
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Request Body
        <Tooltip title={t('Complement with BODY for testing')}>
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
            <RequestBodyTable
              params={filters.body}
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
                isDesktop ? t('No registered BODY') : ''
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
              {t('Add')}
            </Button>
          </>
        )}
        <RequestBodyRegister
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
