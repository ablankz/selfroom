import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';
import { RequestMethods } from '.';
import { RequestFilter } from '../request';
import { MethodKey } from '@/utils/axios';

type Props = {
  onFilterRole: (event: SelectChangeEvent<MethodKey>) => void;
  filters: RequestFilter;
  loading: boolean
};

export const RequestMethodSelector = ({ loading, filters, onFilterRole }: Props) => {
  const theme = useTheme();

  return (
    <FormControl
      sx={{
        flexShrink: 0,
        width: { xs: 0.68, md: 200 },
      }}
    >
      <InputLabel>Method</InputLabel>

      <Select
        value={filters.method}
        onChange={onFilterRole}
        disabled={loading}
        sx={{
          color: RequestMethods[filters.method].color,
        }}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 240 },
          },
          sx: {
            '&& .Mui-selected': {
              backgroundColor: '#ee6233',
              opacity: 0.95,
              ':hover': {
                backgroundColor: '#ee6233',
                opacity: 1.0,
              },
            },
          },
        }}
      >
        {Object.entries(RequestMethods).map((option) => (
          <MenuItem
            key={option[1].slug}
            value={option[0]}
            sx={{
              color: option[1].color || theme.palette.text.secondary,
            }}
          >
            {option[0]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
