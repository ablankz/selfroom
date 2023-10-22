import { RoomFilter } from '@/api/chat-rooms/useGetChatRoomsQuery';
import { useGetRoomCategoriesQuery } from '@/api/room-categories/useGetRoomCategoriesQuery';
import { useLocales } from '@/locales';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';
import { Autocomplete, Chip, TextField } from '@mui/material';

type Props = {
  filters: RoomFilter;
  handleFilterCategories: (newValue: RoomCategoriesData[]) => void;
};

export const RoomCategoriesAc = ({
  filters,
  handleFilterCategories,
}: Props) => {
  const { data } = useGetRoomCategoriesQuery();
  const { t } = useLocales();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={(data?.data || []).map((option) => option)}
      getOptionLabel={(option: RoomCategoriesData) => t(option.name)}
      value={filters.categories}
      onChange={(_, newValue) => handleFilterCategories(newValue)}
      renderInput={(params) => (
        <TextField placeholder="Select Categories" {...params} />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.roomCategoryId}>
          {t(option.name)}
        </li>
      )}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.roomCategoryId}
            label={t(option.name)}
            size="small"
            variant="soft"
          />
        ))
      }
    />
  );
};
