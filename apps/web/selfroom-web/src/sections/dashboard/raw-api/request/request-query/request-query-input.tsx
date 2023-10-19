import Iconify from '@/components/iconify';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { RequestFilter } from '../request';
import { useLocales } from '@/locales';

type Props = {
  filters: RequestFilter;
  onFocus: () => void;
  onBlur: () => void;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilterName: () => void;
  loading: boolean;
};

export const RequestQueryInput = ({
  filters,
  onFocus,
  onBlur,
  onFilterName,
  resetFilterName,
  loading,
}: Props) => {
  const { t } = useLocales();
  return (
    <TextField
      fullWidth
      onFocus={onFocus}
      onBlur={onBlur}
      sx={{ width: { xs: 1, sm: 380 } }}
      value={filters.name}
      onChange={onFilterName}
      disabled={loading}
      placeholder={t('Enter endpoint...')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
        endAdornment: (
          <>
            {loading ? (
              <Iconify icon="svg-spinners:8-dots-rotate" />
            ) : !!filters.name ? (
              <IconButton onClick={() => resetFilterName()}>
                <Iconify icon="material-symbols:close" />
              </IconButton>
            ) : null}
          </>
        ),
      }}
    />
  );
};
