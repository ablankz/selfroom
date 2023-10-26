import { useGetRoomCategoriesQuery } from '@/api/room-categories/useGetRoomCategoriesQuery';
import { useLocales } from '@/locales';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';
import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';

type Props = {
  categories: RoomCategoriesData[];
  handleCategories: (newValue: RoomCategoriesData[]) => void;
};

export const RoomCategoriesAc = ({ categories, handleCategories }: Props) => {
  const { data, status } = useGetRoomCategoriesQuery({ suspense: false });
  const { t } = useLocales();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={(data?.data || []).map((option) => option)}
      getOptionLabel={(option: RoomCategoriesData) => t(option.name)}
      value={categories}
      onChange={(_, newValue) => handleCategories(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Categories"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {status === 'loading' ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
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
