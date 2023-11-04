import { Divider, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { RoomFilter } from '@/api/chat-rooms/useGetChatRoomsQuery';
import { useLocales } from '@/locales';
import { Dispatch, SetStateAction, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  filters: RoomFilter;
  onSearch: (inputValue: string) => void;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

export const RoomSearch = ({ filters, onSearch, setDispatch, isLoading }: Props) => {
  const { t } = useLocales();
  const [query, setQuery] = useState(filters.query);

  const handleClick = () => {
    onSearch(query);
    setDispatch(true);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: 1, sm: 400 },
        bgcolor: 'background.neutral',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={`${
          filters.queryBy === 'id' ? t('Search by id') : t('Search by name')
        }...`}
        onKeyUp={handleKeyUp}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <LoadingButton loading={isLoading} sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
        <SearchIcon />
      </LoadingButton>
    </Paper>
  );
};
