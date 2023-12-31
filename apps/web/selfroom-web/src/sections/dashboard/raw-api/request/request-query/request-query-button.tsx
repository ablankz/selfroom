import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Dispatch, SetStateAction } from 'react';
import { RequestQuery } from '../../view/raw-api-view';
import { RequestFilter } from '../request';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocales } from '@/locales';
import { endpointMatch } from '@/utils/rawAxios';
import { useSnackbar } from '@/components/snackbar';

type Props = {
  loading: boolean;
  filters: RequestFilter;
  setRequestQuery: Dispatch<SetStateAction<RequestQuery>>;
};

export const RequestQueryButton = ({
  loading,
  filters,
  setRequestQuery,
}: Props) => {
  const smUp = useResponsive('up', 'sm');
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    //　prod用
    // -------------------------------------------------------------------------
    const matchPoint = endpointMatch(filters.method, filters.name);
    if (!matchPoint) {
      enqueueSnackbar({
        variant: 'error',
        message: t('No endpoint matching pattern found'),
      });
      return;
    }
    // -------------------------------------------------------------------------
    setRequestQuery({
      endpoint: filters.name,
      method: filters.method,
      dispatch: true,
      body: filters.body,
      param: filters.param,
      header: filters.header,
    });
  };

  return (
    <LoadingButton
      fullWidth={smUp ? false : true}
      onClick={handleClick}
      size="large"
      endIcon={<SendIcon />}
      color="info"
      disabled={loading}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      sx={{
        mx: 1,
      }}
    >
      {t('Send')}
    </LoadingButton>
  );
};
