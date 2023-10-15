import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Dispatch, SetStateAction } from 'react';
import { RequestQuery } from '../../view/raw-api-view';
import { RequestFilter } from '../request';
import { useResponsive } from '@/hooks/use-responsive';

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
  const handleClick = () => {
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
      <span>Send</span>
    </LoadingButton>
  );
};
