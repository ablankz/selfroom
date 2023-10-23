import { useGetRoomCategoriesQuery } from '@/api/room-categories/useGetRoomCategoriesQuery';
import { useLocales } from '@/locales';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';
import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {};

export const RoomCategoriesRHFAc = ({}: Props) => {
  const { data } = useGetRoomCategoriesQuery({ suspense: false });
  const { t } = useLocales();
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name="categories"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          freeSolo
          placeholder={`+ ${t('Categories')}`}
          options={(data?.data || []).map((option) => option)}
          multiple
          getOptionLabel={(option: RoomCategoriesData | string) =>
            t((option as RoomCategoriesData).name)
          }
          renderOption={(props, option) => (
            <li {...props} key={(option as RoomCategoriesData).roomCategoryId}>
              {t((option as RoomCategoriesData).name)}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={(option as RoomCategoriesData).roomCategoryId}
                label={t((option as RoomCategoriesData).name)}
                variant="soft"
              />
            ))
          }
          isOptionEqualToValue={(option, v) =>
            (option as RoomCategoriesData).roomCategoryId === (v as RoomCategoriesData).roomCategoryId
          }
          onChange={(_, newValue) =>
            setValue('categories', newValue, { shouldValidate: true })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('Categories')}
              placeholder={`+ ${t('Categories')}`}
              error={!!error}
              helperText={error ? error?.message : undefined}
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
        />
      )}
    />
  );
};
