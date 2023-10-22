import { useGetRoomCategoriesQuery } from '@/api/room-categories/useGetRoomCategoriesQuery';
import { RHFAutocomplete } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';
import { Chip } from '@mui/material';

type Props = {};

export const RoomCategoriesRHFAc = ({
}: Props) => {
  const { data } = useGetRoomCategoriesQuery();
  const { t } = useLocales();

  return (
    <RHFAutocomplete
      name="categories"
      label={t('Categories')}
      freeSolo
      placeholder={`+ ${t('Categories')}`}
      multiple
      options={(data?.data || []).map((option) => option)}
      getOptionLabel={(option: RoomCategoriesData | string) => typeof option === 'string' ? option : t(option.name)}
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
